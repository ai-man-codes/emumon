import * as path from 'path';
import extractZip from 'extract-zip';
import { extractFull } from 'node-7z';
import { path7za } from '7zip-bin';
import fs from 'fs/promises';

// extension for the emulator archive
type ext = '.zip' | '.7z';

interface unzipFileInterface {
    filePath: string;
    outputPath: string;
    emulatorName: string;
}

async function unzipFile({ filePath, outputPath, emulatorName }: unzipFileInterface): Promise<void> {
    const fileExt: ext = path.extname(filePath) === '.zip' ? '.zip' : '.7z';
    console.log("fileExt: ", fileExt)
    console.log(filePath, outputPath, emulatorName)
    
    if(fileExt === '.zip') {
        try {
            await extractZip(filePath, { dir: outputPath + '/' + emulatorName });

            await fs.rm(filePath, { recursive: true });

        } catch (error) {
            console.error('Error extracting zip file:', error);
            throw error;
            
        }
    }

    if(fileExt === '.7z') {

        try {
            await new Promise<void>((resolve, reject) => {
                const stream = extractFull(filePath, outputPath + '/' + emulatorName, {
                    $bin: path7za,
                });
                stream.on('end', resolve);
                stream.on('error', reject);
            });

            await fs.rm(filePath, { recursive: true });

        } catch (error) {
            console.error('Error extracting 7z file:', error);
            throw  error;
            
        }
    }
}

export default unzipFile;