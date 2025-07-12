import * as fs from 'fs';
import * as path from 'path';

import downloadFile from '../helpers/downloadFile';

interface Emulator {
    url: string;
    emulatorName: string;
    userDir: string;
}

async function downloadEmulator({ url, emulatorName, userDir }: Emulator): Promise<void> {
    const ext = path.extname(url);
    const saveDir = path.join(userDir, 'emulators');

    fs.mkdirSync(saveDir, { recursive: true });

    const savePath = path.join(saveDir, emulatorName + ext);

    await downloadFile(url, savePath);

}

export default downloadEmulator;