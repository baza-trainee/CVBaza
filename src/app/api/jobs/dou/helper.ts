/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DouJob {
  title: string;
  company: string;
  description: string;
  link: string;
  id: string;
}

export async function searchForKeyword(
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
