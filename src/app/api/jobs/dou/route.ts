/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import chromium from "@sparticuz/chromium-min";
import puppeteer, { type Browser } from "puppeteer";
import puppeteerCore, {
  type Browser as BrowserCore,
  type LaunchOptions,
} from "puppeteer-core";
import { searchForKeyword } from "./helper";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

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

    let browser: Browser | BrowserCore;
    if (
      process.env.NODE_ENV === "production" ||
      process.env.VERCEL_ENV === "production"
    ) {
      const executablePath = await chromium.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar"
      );
      browser = await puppeteerCore.launch({
        executablePath,
        args: chromium.args,
        headless: true,
        defaultViewport: chromium.defaultViewport,
      } as LaunchOptions);
    } else {
      browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    }

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
    return NextResponse.json({ error }, { status: 500 });
  }
}
