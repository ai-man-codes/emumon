import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import getHexromConsoles from './extensions/hexrom/consoles/getHexromConsoles'
import getHexromRoms from './extensions/hexrom/roms/getHexromRoms'
import getHexromRomDetails from './extensions/hexrom/roms/getHexromRomDetails'
  
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1500,
    height: 1000,
    frame: false,
    show: false,
    roundedCorners: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
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
            const consoles = await getHexromConsoles();
            return consoles;

        default:
            throw new Error("Extension not available");
    }
  });

  ipcMain.handle("fetch-roms", async(_, extension: string, consoleId: string) => {
    console.log(extension, consoleId)
    switch (extension) {
        case "hexrom":
            const roms = await getHexromRoms(consoleId);
            return roms;
    
        default:
            throw new Error("Conosle url not available")
    }
  })

  ipcMain.handle("fetch-rom-details", async(_, extension: string, romUrl: string) => {
    switch (extension) {
      case "hexrom":
        const romDetails = await getHexromRomDetails(romUrl);
        return romDetails;

        default:
          throw new Error("Rom url not available")
    }
  })

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
