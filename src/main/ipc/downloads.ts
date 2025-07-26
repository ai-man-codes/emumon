import { ipcMain } from 'electron';
import { BrowserWindow } from 'electron';
import { download } from 'electron-dl';
import unzipFile from '../helpers/unzipFile';

ipcMain.handle('download-emulator', async (event, { emulatorName, emulatorUrl, downloadPath }: { emulatorName: string, emulatorUrl: string, downloadPath: string }) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    const emulatorDownloadPath = downloadPath + '/emumon-downloads' + '/emulators'

    if (!win) throw new Error('Window not found');

    try {
        const downloadEmulator = await download(win, emulatorUrl, {
            directory: emulatorDownloadPath,
            onProgress: (progress) => {
                event.sender.send('download-emulator-progress', {
                    percent: progress.percent,
                    transferredBytes: progress.transferredBytes,
                    totalBytes: progress.totalBytes,
                });
            },
        });

        await unzipFile({ filePath: downloadEmulator.getSavePath(), outputPath: emulatorDownloadPath, emulatorName });

        return {
            success: true,
            path: emulatorDownloadPath
        }
        
    } catch (error) {
        return {
            success: false,
            error: `Failed to download file: ${error}`
        }
    }
    
});