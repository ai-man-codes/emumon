import axios from "axios";
import * as cheerio from "cheerio";
import { Rom } from "../../../types/rom";

const BASE_URL = "https://www.romspedia.com"

async function getRomspediaRoms(consoleId: string): Promise<Rom[]> {
    try {
        const consoleUrl = BASE_URL + '/roms/' + consoleId;

        const { data: html } = await axios.get(consoleUrl);
        const $ = cheerio.load(html);
    
        const roms: Rom[] = [];

        $('.single-rom').each((_, el) => {
            const name = $(el).find('a h2').text().trim();
            const romUrl = $(el).find('.roms-ftr a').attr('href')?.trim() || '';
            let imageUrl = $(el).find('a picture img').attr('src')?.trim() || '';

            if (imageUrl.startsWith('data:image')) {
                imageUrl = $(el).find('a picture img').attr('data-src')?.trim() || imageUrl;
            }

            if (name && romUrl && imageUrl) {
                roms.push({
                    name,
                    romUrl: BASE_URL + romUrl,
                    imageUrl,
                });
            }
        });

        return roms;

    } catch(err) {
        console.error("Error getting roms from romspedia", err);
        return [];
    }
}

// (async () => {
//     const roms = await getRomspediaRoms("nintendo-ds");
//     console.log(roms);
// })();

export default getRomspediaRoms;