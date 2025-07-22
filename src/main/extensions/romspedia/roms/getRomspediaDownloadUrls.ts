import { DownloadRom } from "../../../types/downloadRom";
import axios from "axios";
import * as cheerio from "cheerio";

const BASE_URL = "https://www.romspedia.com"

async function getRomspediaDownloadUrls(romUrl: string): Promise<DownloadRom[]> {
    const romUrlDownload = BASE_URL + romUrl

    try {
        const { data: html } = await axios.get(romUrlDownload);
        const $ = cheerio.load(html);

        const downloadRoms: DownloadRom[] = [];

        const downloadUrl = $('.row .col-12 p a').attr('href')?.trim() || '';
        const downloadName = $('.breadcrumb-item:nth-child(4) a span').text().trim() || '';

        downloadRoms.push({
            downloadUrl,
            downloadName: 'Download ' + downloadName,
        })

        return downloadRoms;

    } catch (error) {
        console.error("Error getting romspedia download urls", error);
        return [];
    }
}

// (async () => {
//     const downloadRoms = await getRomspediaDownloadUrls("https://www.romspedia.com/roms/playstation-portable/god-of-war-ghost-of-sparta/download?speed=fast");
//     console.log(downloadRoms);
// })();

export default getRomspediaDownloadUrls;