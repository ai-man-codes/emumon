import fs from 'fs/promises';
import path from 'path';

async function removeTempFile(filePath: string) {
    const tempDirPath = path.join(filePath.split('__temp__')[0], '__temp__');
    await fs.rm(tempDirPath, { recursive: true });
}

export default removeTempFile;