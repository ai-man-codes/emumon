import axios from "axios";
import * as cheerio from "cheerio";

import { Console } from "../../../types/console";

const BASE_URL = "https://www.romspedia.com/"
const CONSOLES_URL = BASE_URL + '/roms'

async function getRomspediaConsoles(): Promise<Console[]> {
    try {
        const { data: html } = await axios.get(CONSOLES_URL)   
        const $ = cheerio.load(html)

        const consoles: Console[] = [];

        $('#list-rom-consoles div div').each((_, el) => {
            const name = $(el).find('.emulator-title').text().trim()
            const totalGames = parseInt($(el).find('a div p').text().trim())
            const url = $(el).find('a').attr('href') || '';
            // const imageUrl = $(el).find('.img-fluid').attr('src') || '';

            if (name && totalGames && url) {
                consoles.push({
                    name,
                    totalGames,
                    url: BASE_URL + url,
                    // imageUrl
                })
            }
        })

        consoles.shift();

        return consoles

    } catch (error) {
        console.error("Error scraping consoles:", error);
        return [];
    }
}
// Test for this scrape:

// (async () => {
//     const response = await getRomspediaConsoles()
//     console.log(response)
// })()

export default getRomspediaConsoles
