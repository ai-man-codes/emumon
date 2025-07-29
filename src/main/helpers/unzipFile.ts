import * as path from 'path';
import extractZip from 'extract-zip';
import { extractFull, list } from 'node-7z';
import { path7za } from '7zip-bin';
import fs from 'fs/promises';
import fsSync from 'fs';
import { createExtractorFromData } from 'node-unrar-js';

// extension for the emulator archive
type ext = '.zip' | '.7z' | '.rar';

interface unzipFileInterface {
    filePath: string;
    outputPath: string;
}

async function unzipFile({ filePath, outputPath }: unzipFileInterface): Promise<void> {
    const fileExt: ext = path.extname(filePath).toLowerCase() as ext;

    console.log(filePath);
    console.log(fileExt);
    
    if(fileExt === '.zip') {
        try {
            await extractZip(filePath, { dir: outputPath });

            await fs.rm(filePath, { recursive: true });

        } catch (error) {
            console.error('Error extracting zip file:', error);
            throw error;
            
        }
    }

    if(fileExt === '.7z') {

        try {
            await new Promise<void>((resolve, reject) => {
                const stream = extractFull(filePath, outputPath, {
                    $bin: path7za,
                    recursive: true,
                });                
                stream.on('end', resolve);
                stream.on('error', reject);
            });

            await fs.rm(filePath, { recursive: true });

        } catch (error) {
            console.error('Error extracting 7z or rar file:', error);
            throw  error;
            
        }
    }

    if(fileExt === '.rar') {
        try {
            const data = Uint8Array.from(fsSync.readFileSync(filePath)).buffer; // we are creating a buffer from the file
            const extractor = await createExtractorFromData({ data });
        
            const list = extractor.getFileList(); // we are getting the files from the extractor

            const extracted = extractor.extract({ files: [...list.fileHeaders].map(file => file.name) });

            for(const file of extracted.files) {
                const fileOutputPath = path.join(outputPath, file.fileHeader.name);

                if(file.fileHeader.flags.directory) {
                    await fs.mkdir(fileOutputPath, { recursive: true });
                } else {
                    await fs.mkdir(path.dirname(fileOutputPath), { recursive: true });

                    if(!file.extraction) throw new Error('File extraction failed');

                    const buffer = Buffer.from(file.extraction);
                    await fs.writeFile(fileOutputPath, buffer);
                }
            }
            const tempDirPath = path.join(filePath.split('__temp__')[0], '__temp__');

            await fs.rm(tempDirPath, { recursive: true });

        } catch (error) {
            console.error('Error extracting rar file:', error);
            throw error;
        }
    }


}

export default unzipFile;