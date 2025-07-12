import axios from "axios";
import * as cheerio from "cheerio";

interface Emulator {
    name: string;
    emulatorUrl: string;
    imageUrl: string;
}

async function scrapeEmulators(consoleUrl: string): Promise<Emulator[]> {
    try {
        const { data: html } = await axios.get(consoleUrl);
        const $ = cheerio.load(html);   

        const roms: Emulator[] = [];

        $('.custom-card').each((_, el) => {
            const name = $(el).find('h2').text().trim();
            const emulatorUrl = $(el).find('a').attr('href') || '';
            const imageUrl = $(el).find('.image-container img').attr('data-src') || '';

            if(name && emulatorUrl && imageUrl) {
                roms.push({
                    name,
                    emulatorUrl,
                    imageUrl,
                });
            }
        })

        return roms;

    } catch (error) {
        console.error("Error scraping Emulators:", error);
        return [];
    }
}

export default scrapeEmulators;
