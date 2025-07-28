import { ipcMain } from "electron";
import { BrowserWindow } from "electron";
import { addDownload, callAria2, monitorDownload } from "../lib/aria2/arai2Client";
import path from "path";
import settingsStore from "../store/settings/store";
import addEmulator from "./emulators";
import unzipFile from "../helpers/unzipFile";

ipcMain.handle('download-emulator', async (event, emulatorUrl: string, emulatorName: string) => {

    const downloadPath = path.join(settingsStore.get('downloadPath'), 'emulators', '__temp__');
    const savePath = path.join(settingsStore.get('downloadPath'), 'emulators', emulatorName);

    const gid = await addDownload(emulatorUrl, downloadPath);

    monitorDownload(gid);

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
        speed: (speed / 1024 / 1024).toFixed(2), // in MB/s
        status: status.status
      });
  
      if (status.status === 'complete') {
        clearInterval(interval);
        addEmulator(emulatorName, savePath);
        await unzipFile({ filePath: downloadPath, outputPath: savePath });
      }
    }, 1000);
  
    return gid;
});

ipcMain.handle('download-rom', async (event, romUrl: string, romName: string, consoleId: string, extension: string) => {

  const downloadPath = path.join(settingsStore.get('downloadPath'), 'roms', extension, consoleId, romName);

  const gid = await addDownload(romUrl, downloadPath);

  monitorDownload(gid);

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
      speed: (speed / 1024 / 1024).toFixed(2), // in MB/s
      status: status.status
    });

    if (status.status === 'complete') {
      clearInterval(interval);
    }
  }, 1000);

  return gid;
    
});