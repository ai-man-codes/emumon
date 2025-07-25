import * as fs from 'fs';
import * as path from 'path';

import downloadFile from '../helpers/downloadFile';
import unzipFile from '../helpers/unzipFile';

interface Rom {
    url: string;
    romName: string;
    userDir: string;
    source: string;
}

async function downloadRom({ url, romName, userDir, source }: Rom): Promise<void> {
    const ext = path.extname(url);
    const saveDir = path.join(userDir, 'emumon-downloads', 'roms', source);

    fs.mkdirSync(saveDir, { recursive: true });

    const savePath = path.join(saveDir, romName + ext);

    const saveRomDir = path.join(saveDir, source);

    await downloadFile(url, savePath);

    await unzipFile({
        filePath: savePath, 
        outputPath: saveRomDir,
    });

    fs.unlinkSync(savePath); // Remove the downloaded archive after extraction
}

export default downloadRom;

/*

// Test code to download and extract a rom
(async () => {
    const rom: Rom = {
        url: 'https://dl4.hexrom.com/rom/gba/Pokemon_FireRed_Version_[hexrom.com].zip',
        romName: 'Pokemon FireRed Version',
        userDir: path.join(__dirname, 'rom_download_test'),
        source: 'hexrom',
    };

    try {
        await downloadRom(rom);
        console.log('ROM downloaded and extracted successfully.');
    } catch (error) {
        console.error('Error downloading or extracting ROM:', error);
    }
})();

*/