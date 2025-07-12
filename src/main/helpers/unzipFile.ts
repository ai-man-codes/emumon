import * as path from 'path';

import * as extractZip from 'extract-zip';
import { Extract } from 'node-7z';
import { path7za } from '7zip-bin';

// extension for the emulator archive
type ext = '.zip' | '.7z';

interface unzipFileInterface {
    filePath: string;
    outputPath: string;
}

async function unzipFile({ filePath, outputPath }: unzipFileInterface): Promise<void> {
    const emulatorExt: ext = path.extname(filePath) === '.zip' ? '.zip' : '.7z';

    if(emulatorExt === '.zip') {
        try {
            await extractZip(filePath, { dir: outputPath });

        } catch (error) {
            console.error('Error extracting zip file:', error);
            throw error;
            
        }
    }

    if(emulatorExt === '.7z') {
        try {
            await new Promise((resolve, reject) => {
            sevenZip.on('end', resolve);
            sevenZip.on('error', reject);
            sevenZip.extractFull(filePath, outputPath);
        });

        } catch (error) {
            console.error('Error extracting 7z file:', error);
            throw  error;
            
        }
        const sevenZip = new Extract({
            $bin: path7za,
        });
    }
}

export default unzipFile;