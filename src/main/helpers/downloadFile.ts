import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

async function downloadFile(url: string, savePath: string): Promise<void> {
    try {
        const writer = fs.createWriteStream(savePath);

        const response = await axios.get(url, {
            responseType: "stream",
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
