import axios from "axios";
import * as cheerio from "cheerio";

const BASE_URL = "https://hexrom.com/rom-category/";

import { Console } from "../../../types/console";

async function getHexromConsoles(): Promise<Console[]> {
    try {
        const { data: html } = await axios.get(BASE_URL);
        const $ = cheerio.load(html);

        const consoles: Console[] = [];

        $('.my-category-list li').each((_, el) => {
            const name = $(el).find('a').text().trim();
            const totalGames = $(el).find('span').text().trim();
            const url = $(el).find('a').attr('href') || '';

            if(name && totalGames && url) {
                consoles.push({
                    name,
                    totalGames: parseInt(totalGames),
                    url,
                })
            }
        });

        return consoles;

    } catch (error) {
        console.error("Error scraping consoles:", error);
        return [];
    }
}

// (async () => {
//     const consoles = await getHexromConsoles();
//     console.log(consoles);
// })();

export default getHexromConsoles