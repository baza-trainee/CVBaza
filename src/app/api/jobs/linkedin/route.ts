/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { getUserLocation } from "@/lib/get-user-location";

async function searchForKeyword(browser: any, keyword: string) {
  const page = await browser.newPage();

  try {
    // Set a realistic viewport and user agent
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
    );

    // Enable stealth mode
    await page.evaluateOnNewDocument(() => {
      // Hide webdriver
      Object.defineProperty(navigator, "webdriver", { get: () => false });
      // Hide automation
      Object.defineProperty(navigator, "plugins", {
        get: () => [1, 2, 3, 4, 5],
      });
      Object.defineProperty(navigator, "languages", {
        get: () => ["en-US", "en"],
      });
    });

    // Get user's location from our utility function
    const location = await getUserLocation();
    const country = location.country;

    // Set longer timeout and enable JavaScript
    await page.setDefaultTimeout(30000);
    await page.setJavaScriptEnabled(true);

    // Add request interception to modify headers
    await page.setRequestInterception(true);
    page.on(
      "request",
      (request: {
        headers: () => any;
        continue: (arg0: { headers: any }) => void;
      }) => {
        const headers = request.headers();
        headers["Accept-Language"] = "en-US,en;q=0.9";
        headers["Accept"] =
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8";
        request.continue({ headers });
      }
    );

    // Add location to search URL
    const searchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keyword)}&location=${encodeURIComponent(country)}`;
    console.log(`Searching LinkedIn jobs at: ${searchUrl}`);

    await page.goto(searchUrl, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // First check if we're redirected to login page
    const isLoginPage = await page.evaluate(() => {
      return window.location.href.includes("linkedin.com/login");
    });

    if (isLoginPage) {
      console.log("LinkedIn requires authentication. Returning empty results.");
      return [];
    }

    // Wait a bit for dynamic content
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Try different selectors for job listings
    const selectors = [
      ".jobs-search__results-list",
      ".scaffold-layout__list-container",
      ".jobs-search-results-list",
    ];

    let foundSelector = null;
    for (const selector of selectors) {
      const element = await page.$(selector);
      if (element) {
        foundSelector = selector;
        break;
      }
    }

    if (!foundSelector) {
      console.log("No job listings found with known selectors");
      return [];
    }

    // Scroll to load more results
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const maxScrolls = 20; // Limit scrolling to prevent infinite loops
        let scrollCount = 0;

        const timer = setInterval(() => {
          const scrollHeight = document.documentElement.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          scrollCount++;

          if (totalHeight >= scrollHeight || scrollCount >= maxScrolls) {
            clearInterval(timer);
            resolve(true);
          }
        }, 200); // Increased interval to reduce rate limiting
      });
    });

    // Wait a bit for any dynamic content to load after scrolling
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Extract job listings with more flexible selectors
    const jobs = await page.evaluate(() => {
      const getTextContent = (element: Element | null, selector: string) => {
        const el = element?.querySelector(selector);
        return el?.textContent?.trim() || "";
      };

      const getLink = (element: Element | null, selector: string) => {
        const el = element?.querySelector(selector);
        return el?.getAttribute("href") || "";
      };

      // Try different selectors for job cards
      const cardSelectors = [
        ".jobs-search__results-list > li",
        ".scaffold-layout__list-container div.job-search-card",
        ".jobs-search-results-list .job-card-container",
      ];

      let listings: Element[] = [];
      for (const selector of cardSelectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          listings = Array.from(elements);
          break;
        }
      }

      return listings
        .map((listing) => {
          // Try different selectors for each field
          const titleSelectors = [
            ".base-search-card__title",
            ".job-card-list__title",
            "h3.base-search-card__title",
            ".job-card-container__link",
          ];

          const companySelectors = [
            ".base-search-card__subtitle",
            ".job-card-container__company-name",
            ".job-card-container__primary-description",
          ];

          const locationSelectors = [
            ".job-search-card__location",
            ".job-card-container__metadata-item",
            ".job-card-container__location",
          ];

          const linkSelectors = [
            ".base-card__full-link",
            ".job-card-list__title",
            ".job-card-container__link",
          ];

          let title = "";
          let company = "";
          let location = "";
          let link = "";

          // Try each selector until we find content
          for (const selector of titleSelectors) {
            title = getTextContent(listing, selector);
            if (title) break;
          }

          for (const selector of companySelectors) {
            company = getTextContent(listing, selector);
            if (company) break;
          }

          for (const selector of locationSelectors) {
            location = getTextContent(listing, selector);
            if (location) break;
          }

          for (const selector of linkSelectors) {
            link = getLink(listing, selector);
            if (link) break;
          }

          // Generate a unique ID
          const id = Math.random().toString(36).substring(7);

          return {
            title,
            company,
            description: location,
            link: link.startsWith("http")
              ? link
              : `https://www.linkedin.com${link}`,
            id,
            source: "linkedin",
          };
        })
        .filter((job) => job.title && job.company && job.link);
    });

    return jobs;
  } catch (error) {
    console.error(`Error searching LinkedIn for ${keyword}:`, error);
    return [];
  } finally {
    await page.close();
  }
}

export async function POST(req: Request) {
  try {
    const { searchQuery } = await req.json();

    // Split the search query into individual keywords
    const keywords = searchQuery.split(/[,\\s]+/).filter(Boolean);

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    // Search for each keyword in parallel
    const jobsArrays = await Promise.all(
      keywords.map((keyword: string) => searchForKeyword(browser, keyword))
    );

    await browser.close();

    // Combine all results and remove duplicates based on job link
    const uniqueJobs = Array.from(
      new Map(jobsArrays.flat().map((job) => [job.link, job])).values()
    );

    return NextResponse.json({ jobs: uniqueJobs });
  } catch (error) {
    console.error("Error fetching LinkedIn jobs:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
