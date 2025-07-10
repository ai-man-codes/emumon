import axios from "axios";
import * as cheerio from "cheerio";

interface Rom {
    name: string;
    romUrl: string;
    imageUrl: string;
}

async function scrapeRoms(consoleUrl: string): Promise<Rom[]> {
    try {
        const { data: html } = await axios.get(consoleUrl);
        const $ = cheerio.load(html);   

        const roms: Rom[] = [];

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

        return roms;

    } catch (error) {
        console.error("Error scraping ROMs:", error);
        return [];
    }
}

export default scrapeRoms;