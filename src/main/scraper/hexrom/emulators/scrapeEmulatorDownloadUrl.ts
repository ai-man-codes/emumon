import axios from "axios";
import * as cheerio from "cheerio";

async function scrapeEmulatorDownloadUrl(emulatorUrl: string): Promise<string[]> {
    const downloadUrls: string[] = [];

    try {
        const { data: html } = await axios.get(emulatorUrl);
        const $ = cheerio.load(html);

        const downloadPageLinks = $('div.dcs a')
            .map((_, el) => $(el).attr('href'))
            .get()
            .filter(Boolean);

        for (const downloadPageUrl of downloadPageLinks) {
            try {
                const { data: pageHtml } = await axios.get(downloadPageUrl);
                const $$ = cheerio.load(pageHtml);

                $$('#dllinkbtn').each((_, el) => {
                    const downloadLink = $$(el).attr('href') || '';
                    if (downloadLink) {
                        downloadUrls.push(downloadLink);
                    }
                });
            } catch (err) {
                console.error("Error fetching download page:", err);
            }
        }

    } catch (error) {
        console.error("Error scraping emulator download URL:", error);
    }

    return downloadUrls.pop() ? downloadUrls : [];
}

export default scrapeEmulatorDownloadUrl;