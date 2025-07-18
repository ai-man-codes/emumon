import axios from "axios";
import * as cheerio from "cheerio";

interface DownloadRom {
    downloadUrls: string[];
}

async function getHexromRomDownloadUrls(romUrl: string): Promise<DownloadRom> {

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

export default getHexromRomDownloadUrls;