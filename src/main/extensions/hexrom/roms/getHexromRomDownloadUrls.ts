import axios from "axios";
import * as cheerio from "cheerio";

interface DownloadRom {
    downloadUrl: string;
    downloadName: string;
}

async function getHexromRomDownloadUrls(romUrl: string): Promise<DownloadRom[]> {

    const downloadRoms: DownloadRom[] = [];

    try {
        const { data: html } = await axios.get(romUrl);
        const $ = cheerio.load(html);

        const noOfDownloads = $('#dllinkbtn').length;

        if (noOfDownloads == 1) {
            const downloadUrl = $('#dllinkbtn').attr('href');
            const downloadName = $('#dllinkbtn div .dlb').text().trim();

            if (!downloadUrl || !downloadName) return downloadRoms;

            downloadRoms.push({
                downloadUrl: downloadUrl,
                downloadName: downloadName,
            })

            return downloadRoms;
        }

        $('#dllinkbtn').each((_, el) => {
            const downloadUrl = $(el).attr('href');
            const downloadName = $(el).text().trim();

            if (!downloadUrl || !downloadName) return;

            downloadRoms.push({
                downloadUrl: downloadUrl,
                downloadName: downloadName,
            })

        });

        if (downloadRoms.length > 1) {
            downloadRoms.pop();
        }

        return downloadRoms;

    } catch (error) {
        console.error("Error scraping ROM download URL:", error);
        return downloadRoms;
        
    }
}

(async () => {
    const romUrl = 'https://hexrom.com/pokemon-sun-3ds/download/'
    const downloadRoms = await getHexromRomDownloadUrls(romUrl)
    console.log(downloadRoms)
})();

export default getHexromRomDownloadUrls;
