import * as fs from 'fs';
import * as path from 'path';

import downloadFile from '../helpers/downloadFile';
import unzipFile from '../helpers/unzipFile';

interface Emulator {
    url: string;
    emulatorName: string;
    userDir: string;
}

async function downloadEmulator({ url, emulatorName, userDir }: Emulator): Promise<void> {
    const ext = path.extname(url);
    const saveDir = path.join(userDir, 'emulators');

    fs.mkdirSync(saveDir, { recursive: true });

    const saveEmulatorDir = path.join(saveDir, emulatorName);

    const savePath = path.join(saveDir, emulatorName + ext);

    await downloadFile(url, savePath);

    await unzipFile({
        filePath: savePath, 
        outputPath: saveEmulatorDir,
    });

    fs.unlinkSync(savePath); // Remove the downloaded archive after extraction
}

export default downloadEmulator;


/*
// Test code to download and extract an emulator

(async () => {
    const emulator: Emulator = {
        url: 'https://github.com/TASEmulators/desmume/releases/download/release_0_9_13/desmume-0.9.13-win64.zip',
        emulatorName: 'desmume',
        userDir: path.join(__dirname, 'emumon_download_test'),
    };
    try {
        await downloadEmulator(emulator);
        console.log('Emulator downloaded and extracted successfully.');
    } catch (error) {
        console.error('Error downloading or extracting emulator:', error);
    }
})();

*/