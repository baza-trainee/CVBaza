/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export interface DouJob {
  title: string;
  company: string;
  description: string;
  link: string;
  id: string;
}

async function searchForKeyword(
  browser: any,
  keyword: string
): Promise<DouJob[]> {
  const page = await browser.newPage();

  try {
    console.log(`Searching for keyword: ${keyword}`);

    // Set a longer timeout for navigation
    await page.setDefaultNavigationTimeout(60000);
    await page.setDefaultTimeout(60000);

    // Enable request interception
    await page.setRequestInterception(true);
    page.on("request", (request: any) => {
      // Only allow document, script, xhr, and fetch requests
      const resourceType = request.resourceType();
      if (["document", "script", "xhr", "fetch"].includes(resourceType)) {
        request.continue();
      } else {
        request.abort();
      }
    });

    // Navigate to the page
    await page.goto(
      `https://jobs.dou.ua/vacancies/?search=${encodeURIComponent(keyword)}`,
      {
        waitUntil: ["domcontentloaded", "networkidle0"],
        timeout: 60000,
      }
    );

    // Wait for either the vacancy list or the no-results message
    try {
      await Promise.race([
        page.waitForSelector(".l-vacancy", { timeout: 30000 }),
        page.waitForSelector(".nothing-found", { timeout: 30000 }),
      ]);
    } catch (err) {
      console.log(err);
      console.log("Timeout waiting for selectors, attempting to continue...");
    }

    // Get cookies regardless of vacancy presence
    const cookies = await page.cookies();
    const csrfCookie = cookies.find(
      (cookie: any) => cookie.name === "csrftoken"
    );

    if (!csrfCookie) {
      console.log("CSRF token not found");
      return [];
    }

    console.log("CSRF token found:", csrfCookie.value);

    const allJobs = await page.evaluate(() => {
      // Check for no results first
      const nothingFound = document.querySelector(".nothing-found");
      if (nothingFound) {
        console.log("No results found");
        return [];
      }

      const vacancies = Array.from(
        document.querySelectorAll(".l-vacancy") || []
      ).slice(0, 10);

      return vacancies.map((vacancy) => ({
        title: vacancy.querySelector(".vt")?.textContent?.trim() || "",
        company: vacancy.querySelector(".company")?.textContent?.trim() || "",
        description:
          vacancy.querySelector(".sh-info")?.textContent?.trim() || "",
        link:
          vacancy.querySelector(".vt a:not(.company)")?.getAttribute("href") ||
          "",
        id: vacancy.getAttribute("data-id") || "",
      }));
    });

    console.log(`Found ${allJobs.length} jobs`);

    console.log(`Total jobs found: ${allJobs.length}`);
    return allJobs.map((job: any) => ({
      ...job,
      link: job.link.startsWith("http")
        ? job.link
        : `https://jobs.dou.ua${job.link}`,
    }));
  } catch (error) {
    console.error(`Error searching for ${keyword}:`, error);
    return [];
  } finally {
    await page.close();
  }
}

// Rate limiting variables
let lastRequestTime = 0;
const minRequestInterval = 2000; // 2 seconds between requests

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: Request) {
  try {
    const { searchQuery } = await req.json();
    const keywords = searchQuery.split(/[,\s]+/).filter(Boolean);

    // Add a small delay between requests to avoid overloading
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < minRequestInterval) {
      await delay(minRequestInterval - timeSinceLastRequest);
    }
    lastRequestTime = Date.now();

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    // Process keywords sequentially instead of in parallel
    const jobsArrays = [];
    for (const keyword of keywords) {
      try {
        const jobs = await searchForKeyword(browser, keyword);
        jobsArrays.push(jobs);
        // Add delay between keyword searches
        await delay(1000);
      } catch (error) {
        console.error(`Error searching for keyword ${keyword}:`, error);
      }
    }

    await browser.close();

    // Flatten all jobs from different keywords
    const allJobs = jobsArrays.flat();
    console.log("Total jobs found (before deduplication):", allJobs.length);

    // Create a more unique key using multiple fields
    const uniqueJobs = Array.from(
      new Map(
        allJobs.map((job) => [
          `${job.id}-${job.company}-${job.title}`, // Using multiple fields as unique key
          job,
        ])
      ).values()
    );

    console.log("Total unique jobs found:", uniqueJobs.length);
    return NextResponse.json({ jobs: uniqueJobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: typeof error === "string" ? error : "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
