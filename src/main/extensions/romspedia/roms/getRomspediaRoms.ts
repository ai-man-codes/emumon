import axios from "axios";
import * as cheerio from "cheerio";
import { Rom } from "../../../types/rom";

const BASE_URL = "https://www.romspedia.com"

async function getRomspediaRoms(consoleId: string, page: number): Promise<{ roms: Rom[], pageCount: number }> {
    try {
        const pagePath = page > 1 ? `/page/${page}` : '';
        const consoleUrl = BASE_URL + '/roms/' + consoleId + pagePath;

        const { data: html } = await axios.get(consoleUrl);
        const $ = cheerio.load(html);
    
        const roms: Rom[] = [];

        const pageCount = parseInt($('.pagination li:last-child a').attr('href')?.split('page/')[1] || '1');

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

        return { roms, pageCount };

    } catch(err) {
        console.error("Error getting roms from romspedia", err);
        return { roms: [], pageCount: 1 };
    }
}

// (async () => {
//     const { roms, pageCount } = await getRomspediaRoms("nintendo-ds", 1);
//     console.log(roms, pageCount);
// })();

export default getRomspediaRoms;