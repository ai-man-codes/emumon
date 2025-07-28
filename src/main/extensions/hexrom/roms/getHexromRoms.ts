import axios from "axios";
import * as cheerio from "cheerio";

import { Rom } from "../../../types/rom";

const BASE_URL = "https://hexrom.com/roms/";

async function getHexromRoms(consoleId: string, page: number): Promise<{ roms: Rom[], pageCount: number }> {
    try {
        const pagePath = page > 1 ? `/page/${page}` : '';
        const consoleUrl = BASE_URL + consoleId + pagePath;

        const { data: html } = await axios.get(consoleUrl);
        const $ = cheerio.load(html);   

        const roms: Rom[] = [];

        const pageCount = $('.navigation a:nth-last-child(2)').attr('href')?.split('page/')[1].replace('/', '') || '1';

        $('.custom-card').each((_, el) => {
            const name = $(el).find('h2').text().trim();
            const romUrl = $(el).find('a').attr('href') || '';
            const imageUrl = $(el).find('.image-container img').attr('data-src') || '';

            if(name && romUrl && imageUrl) {
                roms.push({
                    name,
                    romUrl,
                    imageUrl,
                });
            }
        })

        return { roms, pageCount: parseInt(pageCount) };

    } catch (error) {
        console.error("Error scraping ROMs:", error);
        return { roms: [], pageCount: 1 };
    }
}

export default getHexromRoms;

// (async () => {
//     const roms = await getHexromRoms('snes', 1);
//     console.log(roms);
// })();