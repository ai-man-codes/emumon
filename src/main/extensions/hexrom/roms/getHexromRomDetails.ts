import axios from "axios";
import * as cheerio from "cheerio";

import { RomDetails } from "@/main/types/romDetails";

async function getHexromRomDetails(romUrl: string): Promise<RomDetails> {

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

export default getHexromRomDetails;