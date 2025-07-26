import { ipcMain } from 'electron';
import { BrowserWindow } from 'electron';
import { download } from 'electron-dl';
import unzipFile from '../helpers/unzipFile';
import settingsStore from '../store/settings/store';

ipcMain.handle('download-emulator', async (event, { emulatorUrl, downloadPath, emulatorName }: { emulatorUrl: string, downloadPath: string, emulatorName: string }) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    const emulatorDownloadPath = downloadPath + '/emumon-downloads' + '/emulators' + '/' + emulatorName

    if (!win) throw new Error('Window not found');

    try {
        const downloadEmulator = await download(win, emulatorUrl, {
            directory: emulatorDownloadPath,
            onProgress: (progress) => {
                console.log(progress.percent, progress.transferredBytes, progress.totalBytes)
            },
        });

        await unzipFile({ filePath: downloadEmulator.getSavePath(), outputPath: emulatorDownloadPath });

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

ipcMain.handle('download-rom', async (event, { romUrl, romName, extension }: { romUrl: string, romName: string, extension: string }) => {
    const win = BrowserWindow.fromWebContents(event.sender);

    const downloadPath = settingsStore.get('downloadPath')

    const romDownloadPath = downloadPath + `/emumon-downloads/roms/${extension}/` + romName

    if (!win) throw new Error('Window not found');

    try {
        const downloadRom = await download(win, romUrl, {
            directory: romDownloadPath,
            onProgress: (progress) => {
                console.log(progress.percent, progress.transferredBytes, progress.totalBytes)
            },
        });

        await unzipFile({ filePath: downloadRom.getSavePath(), outputPath: romDownloadPath });

        return {
            success: true,
            path: romDownloadPath
        }
        
    } catch (error) {
        return {
            success: false,
            error: `Failed to download file: ${error}`
        }
    }

    
})