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
    await page.goto(
      `https://jobs.dou.ua/vacancies/?search=${encodeURIComponent(keyword)}`,
      { waitUntil: "networkidle0", timeout: 30000 }
    );

    await page.waitForSelector(".l-vacancy", { timeout: 15000 });

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
      const vacancies = Array.from(
        document.querySelectorAll(".l-vacancy")
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

export async function POST(req: Request) {
  try {
    const { searchQuery } = await req.json();
    const keywords = searchQuery.split(/[,\s]+/).filter(Boolean);

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const jobsArrays = await Promise.all(
      keywords.map((keyword: string) => searchForKeyword(browser, keyword))
    );

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
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
