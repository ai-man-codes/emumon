import axios from "axios";
import * as cheerio from "cheerio";

import { RomDetails } from "../../../types/romDetails";

async function getRomspediaDetails(romUrl: string): Promise<RomDetails> {

    const romDetails: RomDetails = {
        name: '',
        publish: '',
        console: '',
        emulator: '',
        genre: '',
        language: '',
        size: '',
        format: '',
        downloads: '',
        downloadPageUrl: '',
        imageUrl: '',
        category: '',
    }

    try {
        const { data: html } = await axios.get(romUrl)
        const $ = cheerio.load(html);

        $('.view-emulator-detail').each((_, el) => {
            const key = $(el).find('.view-emulator-detail-name').text().trim();
            const value = $(el).find('.view-emulator-detail-value').text().trim();

            switch (key) {
                case "Size:":
                    romDetails.size = value;
                    break;
                case "Console":
                    romDetails.console = value;
                    break;
                case "Category:":
                    romDetails.category = value;
                    break;
                case "Region:":
                    romDetails.language = value;
                    break;
                case "Release Year:":
                    romDetails.publish = value;
                    break;
                case "Downloads:":
                    romDetails.downloads = value;
                    break;
            }
        })

        romDetails.name = $('.main-title').text().trim() || '';
        romDetails.downloadPageUrl = $('#btnDownload').attr('href')?.trim() || '';
        romDetails.imageUrl = $('.roms-img picture img').attr('src')?.trim() || '';

        return romDetails;
            
    } catch (error) {
        console.error("Error getting rom details from romspedia", error);
        return romDetails;
    }
}

// (async () => {
//     const romDetails = await getRomspediaDetails("https://www.romspedia.com/roms/playstation-portable/god-of-war-ghost-of-sparta");
//     console.log(romDetails);
// })();

export default getRomspediaDetails;