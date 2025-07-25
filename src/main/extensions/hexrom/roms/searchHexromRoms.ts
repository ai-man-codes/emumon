import axios from "axios";
import * as cheerio from "cheerio";

import { SearchRom } from "../../../types/searchRom";

const BASE_URL = "https://hexrom.com/";

async function searchHexromRoms(page: number, searchTerm: string): Promise<{ roms: SearchRom[], pageCount: number }> {
    try {
        const pagePath = page > 1 ? `/page/${page}` : '/page/1';
        const consoleUrl = BASE_URL + pagePath + `?s=${searchTerm}`;

        const { data: html } = await axios.get(consoleUrl);
        const $ = cheerio.load(html);   

        const roms: SearchRom[] = [];

        const pageCount = $('.navigation a:nth-last-child(2)').text() || '1';

        $('.custom-card').each((_, el) => {
            const name = $(el).find('h2').text().trim();
            const romUrl = $(el).find('a').attr('href') || '';
            let imageUrl = $(el).find('.image-container picture img').attr('src') || ''

            if (imageUrl === '') {
                imageUrl = $(el).find('.image-container img').attr('src') || '';
            }
            
            roms.push({
                name,
                romUrl,
                imageUrl,
                consoleId: '',
            });
            
        })

        const consoleIdPromise = async (romUrl: string): Promise<string> => {
            const { data: html } = await axios.get(romUrl);
            const $ = cheerio.load(html); 
            
            let consoleId = '';
            $("table tbody tr").each((_, el) => {
                const key = $(el).find("th").text().trim().toLowerCase();
                const value_1 = $(el).find("td a").attr('href') || '';
                const value_2 = $(el).find("td a:nth-child(2)").attr('href') || '';

                const realValue = value_1.length > value_2.length ? value_1 : value_2;
                const value = realValue.split('/')[4] || '';

                switch (key) {
                    case "console":
                        consoleId = value;
                        break;
                    default:
                        break;
                }
            })

            return consoleId || '';
        }

        await Promise.all(
            roms.map(async (rom) => {
              const consoleId = await consoleIdPromise(rom.romUrl);
              rom.consoleId = consoleId;
            })
          );
          

        return { roms, pageCount: parseInt(pageCount) };

    } catch (error) {
        console.error("Error scraping ROMs:", error);
        return { roms: [], pageCount: 1 };
    }
}

export default searchHexromRoms;

(async () => {
    const roms = await searchHexromRoms(1, 'Pokemon');
    console.log(roms);
})();