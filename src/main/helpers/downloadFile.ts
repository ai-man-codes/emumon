import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

async function downloadFile(url: string, savePath: string): Promise<void> {
    try {
        const writer = fs.createWriteStream(savePath);
        const agent = new https.Agent({family: 4}); // Use IPv4

        const response = await axios.get(url, {
            responseType: "stream",
            httpsAgent: agent,
            headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
            "Accept":
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Referer": "https://hexrom.com/",
            "Accept-Language": "en-US,en;q=0.9",
            "Connection": "keep-alive",
            },
            maxRedirects: 10,
        });

        await new Promise<void>((resolve, reject) => {
            response.data.pipe(writer);
            
            writer.on("finish", resolve);
            writer.on("error", reject);
        });

        console.log(`Downloaded to: ${savePath}`);

    } catch (error) {
        console.error("Failed to download file:", error);
    }
}

export default downloadFile;

// const url = "https://github.com/mgba-emu/mgba/releases/download/0.10.3/mGBA-0.10.3-win64.7z";
// const ext = path.extname(url);

// console.log(ext);

// const saveDir = path.join(__dirname, "downloads");
// fs.mkdirSync(saveDir, { recursive: true });

// const savePath = path.join(saveDir, "mgba" + ext);

// downloadFile(url, savePath);
