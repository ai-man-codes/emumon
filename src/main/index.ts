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
    resizable: false
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

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
  
  ipcMain.handle("fetch-consoles", async (_, extension: string) => {

    switch (extension) {
        case "hexrom":
            const consoles = await getHexromConsoles();
            return JSON.stringify(consoles);

        default:
            throw new Error("Extension not available");
    }
  });

  ipcMain.handle("fetch-roms", async(_, extension: string, consoleId: string) => {
    console.log(extension, consoleId)
    switch (extension) {
        case "hexrom":
            const roms = await getHexromRoms(consoleId);
            return JSON.stringify(roms);
    
        default:
            throw new Error("Conosle url not available")
    }
  })

  ipcMain.handle("fetch-rom-details", async(_, extension: string, romUrl: string) => {
    switch (extension) {
      case "hexrom":
        const romDetails = await getHexromRomDetails(romUrl);
        return JSON.stringify(romDetails);

        default:
          throw new Error("Rom url not available")
    }
  })

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
