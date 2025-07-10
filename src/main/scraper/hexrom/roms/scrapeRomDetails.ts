import axios from "axios";
import * as cheerio from "cheerio";

interface RomMetadata {
    publishedDate: string;
    emulator: string;
    downloadCount: number;
}

interface RomDetails {
    name: string;
    downloadPageUrl: string;
    imageUrl: string;
    metadata: RomMetadata;
}

async function scrapeRomDetails(romUrl: string): Promise<RomDetails> {

    const romDetails: RomDetails = {
            name: '',
            downloadPageUrl: '',
            imageUrl: '',
            metadata: {
                publishedDate: '',
                emulator: '',
                downloadCount: 0,
            }
        };

    try {
        const { data: html } = await axios.get(romUrl);
        const $ = cheerio.load(html);

        $('.container').each((_, el) => {

            romDetails['name'] = $(el).find('tbody tr:nth-child(1) td').text().trim();
            romDetails['downloadPageUrl'] = $(el).find('div.dcs a').attr('href') || '';
            romDetails['imageUrl'] = $(el).find('picture img').attr('data-src') || '';

            romDetails['metadata'] = {
                publishedDate: $(el).find('tbody tr:nth-child(2) td').text().trim(),
                emulator: $(el).find('tbody tr:nth-child(4) td a').text().trim(),
                downloadCount: parseInt($(el).find('tbody tr:last-child td').text().trim()) || 0,
            }

        });

        return romDetails;

    } catch (error) {
        console.error("Error scraping ROM details:", error);
        return romDetails;
    }
}

(async () => {
    const romUrl = "https://hexrom.com/pokemon-sun-3ds/"; 
    const romDetails = await scrapeRomDetails(romUrl);
    console.log(romDetails);
})();