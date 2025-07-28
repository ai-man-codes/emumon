import { ipcMain } from 'electron';
import { startAria2, stopAria2, addDownload, getDownloadStatus, monitorDownload } from './arai2Client';

startAria2();

ipcMain.handle('test-download', async (_, url) => {
  const gid = await addDownload(url, 'C:\\Users\\Acer\\Desktop\\emumon-downloads');
  monitorDownload(gid);
  return gid;
});
ipcMain.handle('test-status', async (_, gid) => await getDownloadStatus(gid));
ipcMain.handle('test-stop', () => stopAria2());
