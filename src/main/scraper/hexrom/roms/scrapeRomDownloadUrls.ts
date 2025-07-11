import axios from "axios";
import * as cheerio from "cheerio";

interface DownloadRom {
    downloadUrls: string[];
}

async function scrapeRomDownloadUrls(romUrl: string): Promise<DownloadRom> {

    const downloadRom: DownloadRom = {
        downloadUrls: [],
    }

    try {
        const { data: html } = await axios.get(romUrl);
        const $ = cheerio.load(html);

        $('#dllinkbtn').each((_, el) => {
            const downloadUrl = $(el).attr('href') || '';

            downloadRom.downloadUrls.push(downloadUrl);
        });

        downloadRom.downloadUrls.pop();

        return downloadRom;

    } catch (error) {
        console.error("Error scraping ROM download URL:", error);
        return downloadRom;
        
    }
}

export default scrapeRomDownloadUrls;

(async () => {
    const romUrl = "https://hexrom.com/pokemon-sun-3ds/download/";
    const downloadRom = await scrapeRomDownloadUrls(romUrl);
    console.log(downloadRom);
})();