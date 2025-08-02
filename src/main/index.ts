import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'


import getHexromConsoles from './extensions/hexrom/consoles/getHexromConsoles'
import getHexromRoms from './extensions/hexrom/roms/getHexromRoms'
import getHexromRomDetails from './extensions/hexrom/roms/getHexromRomDetails'
import getHexromRomDownloadUrls from './extensions/hexrom/roms/getHexromRomDownloadUrls'
import getRomspediaConsoles from './extensions/romspedia/consoles/getRomspediaConsoles'
import getRomspediaRoms from './extensions/romspedia/roms/getRomspediaRoms'
import getRomspediaDetails from './extensions/romspedia/roms/getRomspediaDetails'
import getRomspediaDownloadUrls from './extensions/romspedia/roms/getRomspediaDownloadUrls'
import getEmulators from './emulators/getEmulators'


import searchRomspediaRoms from './extensions/romspedia/roms/searchRomspediaRoms'
import searchHexromRoms from './extensions/hexrom/roms/searchHexromRoms'


import './lib/aria2/test'
import './ipc/downloads'
import './ipc/settings'
import './ipc/romLibrary'
import './ipc/launch'


function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    show: false,
    roundedCorners: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false,
    },
    resizable: false,
    // fullscreen: true,
  })

  mainWindow.center();

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.setMenuBarVisibility(false);

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {

  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
  
  ipcMain.handle("fetch-consoles", async (_, extension: string) => {

    switch (extension) {
        case "hexrom":
            const hexromConsoles = await getHexromConsoles();
            return hexromConsoles;

        case "romspedia":
            const romspediaConsoles = await getRomspediaConsoles();
            return romspediaConsoles;

        default:
            throw new Error("Extension not available");
    }
  });

  ipcMain.handle("fetch-roms", async(_, extension: string, consoleId: string, page: number) => {
    
    switch (extension) {
        case "hexrom":
            const hexromRoms = await getHexromRoms(consoleId, page);
            return hexromRoms;

        case "romspedia":
            const romspediaRoms = await getRomspediaRoms(consoleId, page);
            return romspediaRoms;
    
        default:
            throw new Error("Conosle url not available")
    }
  })

  ipcMain.handle("search-roms", async(_, extension: string, page: number, searchTerm: string) => {

    switch (extension) {
      case "romspedia":
        const romspediaRoms = await searchRomspediaRoms(page, searchTerm);
        return romspediaRoms;

        case "hexrom":
          const hexromRoms = await searchHexromRoms(page, searchTerm);
          return hexromRoms;

        default:
          throw new Error("Search roms not available")
    }
  })

  ipcMain.handle("fetch-rom-details", async(_, extension: string, romUrl: string) => {
    switch (extension) {
      case "hexrom":
        const hexromRomDetails = await getHexromRomDetails(romUrl);
        return hexromRomDetails;

        case "romspedia":
          const romspediaRomDetails = await getRomspediaDetails(romUrl);
          return romspediaRomDetails;

        default:
          throw new Error("Rom url not available")
    }
  })

  ipcMain.handle("fetch-rom-download-urls", async(_, extension: string, romUrl: string) => {
    switch (extension) {
      case "hexrom":
        const romDownloadUrls = await getHexromRomDownloadUrls(romUrl);
        return romDownloadUrls;

        case "romspedia":
          const romspediaDownloadUrls = await getRomspediaDownloadUrls(romUrl);
          return romspediaDownloadUrls;

        default:
          throw new Error("Rom url not available")
    }
  })

  ipcMain.handle("select-download-path", async() => {
    const path = await dialog.showOpenDialog({ properties: ['openDirectory'] });
    console.log(path)
    return path.canceled ? null : path.filePaths[0];
  })

  ipcMain.handle("fetch-emulators", async() => {
    const emulators = await getEmulators()
    return emulators
  })

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
