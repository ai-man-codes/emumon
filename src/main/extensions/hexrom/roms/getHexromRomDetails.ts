import axios from "axios";
import * as cheerio from "cheerio";

import { RomDetails } from "../../../types/romDetails"

async function getHexromRomDetails(romUrl: string): Promise<RomDetails> {

    const romDetails: RomDetails = {
      name: '',
      publish: '',
      console: '',
      emulator: '',
      genre: '',
      language: '',
      size: '',
      format: '',
      downloads: '',
      downloadPageUrl: '',
      imageUrl: '',
      category: '',
    }

    try {
      const { data: html } = await axios.get(romUrl);
      const $ = cheerio.load(html);

      const imageUrl = $('.container .row').find('div .img-na').attr('data-src') || '';
      const downloadPageUrl = $('.container .row').find('div .dcs a').attr('href') || '';

      romDetails.imageUrl = imageUrl;
      romDetails.downloadPageUrl = downloadPageUrl;

      $("table tbody tr").each((_, el) => {
          const key = $(el).find("th").text().trim().toLowerCase();
          const value = $(el).find("td").text().trim();
          

          romDetails.downloadPageUrl = downloadPageUrl;
      
          switch (key) {
            case "name":
              romDetails.name = value;
              break;
            case "publish":
              romDetails.publish = value;
              break;
            case "console":
              romDetails.console = value;
              break;
            case "emulator":
              romDetails.emulator = value;
              break;
            case "genre":
              romDetails.genre = value;
              break;
            case "language":
              romDetails.language = value;
              break;
            case "size":
              romDetails.size = value;
              break;
            case "format":
              romDetails.format = value;
              break;
            case "downloads":
              romDetails.downloads = value;
              break;
          }
      });

      return romDetails;

    } catch (error) {
        console.error("Error scraping ROM details:", error);
        return romDetails;
    }
}

export default getHexromRomDetails;
