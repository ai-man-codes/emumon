import axios from "axios";
import * as cheerio from "cheerio";
import { SearchRom } from "../../../types/searchRom";

const BASE_URL = "https://www.romspedia.com/"

async function searchRomspediaRoms(page: number, searchTerm: string): Promise<{ roms: SearchRom[], pageCount: number }> {
    try {
        const searchUrl = BASE_URL + `search.php?currentpage=${page}&search_term_string=${searchTerm}`;

        const { data: html } = await axios.get(searchUrl);
        const $ = cheerio.load(html);
    
        const roms: SearchRom[] = [];

        const pageCount = parseInt($('.pagination li:last-child a').attr('href')?.split('currentpage=')[1].split('&')[0] || '1');

        $('.single-rom').each((_, el) => {
            const name = $(el).find('a h2').text().trim();
            const romUrl = $(el).find('.roms-ftr a').attr('href')?.trim() || '';
            let imageUrl = $(el).find('a picture img').attr('src')?.trim().replace(/[\t\n\r]+/g, '').replace(/ /g, ' ') || '';

            const consoleId = $(el).find('a').attr('href')?.split('/')[2] || '';


            if (imageUrl.startsWith('data:image')) {
                imageUrl = $(el).find('a picture img').attr('data-src')?.trim().replace(/\s+/g, '') || imageUrl;
            }

            if (name && romUrl && imageUrl) {
                roms.push({
                    name,
                    romUrl: BASE_URL + romUrl,
                    imageUrl,
                    consoleId,
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
//     const { roms, pageCount } = await searchRomspediaRoms(1, "Pokemon");
//     console.log(roms, pageCount);
// })();

export default searchRomspediaRoms;