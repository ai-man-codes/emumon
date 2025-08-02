import { ipcMain } from "electron";
import { BrowserWindow } from "electron";
import { addDownload, callAria2, getDownloadFiles, monitorDownloadConsole, monitorDownloadRenderer } from "../lib/aria2/arai2Client";
import path from "path";
import settingsStore from "../store/settings/store";
import addEmulator from "./emulators";
import unzipFile from "../helpers/unzipFile";
import addRomToLibrary from "./romLibrary";
import downloadFile from "../helpers/downloadFile";
import { consoleIdChecker } from "../mappings/consoleMap";

ipcMain.handle('download-emulator', async (event, emulatorUrl: string, emulatorName: string) => {

    const downloadPath = path.join(settingsStore.get('downloadPath'), 'emulators', '__temp__');
    const savePath = path.join(settingsStore.get('downloadPath'), 'emulators', emulatorName);

    const gid = await addDownload(emulatorUrl, downloadPath);

    monitorDownloadConsole(gid);

    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return;
  
    const interval = setInterval(async () => {
      const status = await callAria2('aria2.tellStatus', [gid, ['completedLength', 'totalLength', 'downloadSpeed', 'status']]);
  
      const completed = parseInt(status.completedLength);
      const total = parseInt(status.totalLength);
      const speed = parseInt(status.downloadSpeed);
      const percent = total ? (completed / total) * 100 : 0;
  
      win.webContents.send('aria2-progress', {
        percent,
        speed: (speed / 1024).toFixed(2), // in KB/s
        status: status.status
      });
  
      if (status.status === 'complete') {
        clearInterval(interval);
        addEmulator(emulatorName, savePath);
        const filePath = await getDownloadFiles(gid);
        await unzipFile({ filePath, outputPath: savePath });
      }
    }, 1000);
  
    return gid;
});

ipcMain.handle('download-rom', async (event, romUrl: string, romName: string, consoleId: string, extension: string, imageUrl: string): Promise<string> => {

  const sanitizedRomName = romName.replace(/[<>:"/\\|?*]/g, '_');
  const sanitizedConsoleId = consoleId.replace(/[<>:"/\\|?*]/g, '_');

  const realConsoleId = consoleIdChecker(sanitizedConsoleId)

  const downloadPath = path.join(settingsStore.get('downloadPath'), 'roms', extension, '__temp__');
  const savePath = path.join(settingsStore.get('downloadPath'), 'roms', extension, realConsoleId, sanitizedRomName);

  const gid = await addDownload(romUrl, downloadPath);

  monitorDownloadConsole(gid);
  
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win) throw new Error('Window not found');

  monitorDownloadRenderer(gid, win);

  const interval = setInterval(async () => {
    const status = await callAria2('aria2.tellStatus', [gid, ['completedLength', 'totalLength', 'downloadSpeed', 'status']]);

    const completed = parseInt(status.completedLength);
    const total = parseInt(status.totalLength);
    const speed = parseInt(status.downloadSpeed);
    const percent = total ? (completed / total) * 100 : 0;

    win.webContents.send('aria2-progress', {
      percent,
      speed: (speed / 1024).toFixed(2), // in KB/s
      status: status.status
    });

    if (status.status === 'complete') {
      clearInterval(interval);
      
      const filePath = await getDownloadFiles(gid);

      await unzipFile({ filePath, outputPath: savePath });
      await downloadFile(imageUrl, path.join(savePath, 'image.png'));

      addRomToLibrary({
        name: romName,
        consoleId: realConsoleId,
        extension: extension,
        romPath: savePath,
        imagePath: path.join(savePath, 'image.png')
      });
    }
  }, 1000);

  return gid;
    
});

// ipcMain.on('download-progress', async (event, gid: string) => {
//   const win = BrowserWindow.fromWebContents(event.sender);
//   if (!win) return;
//   return monitorDownloadRenderer(gid, win);
// })

