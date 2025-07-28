import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('api', {

  fetchConsoles: (extension: string) => ipcRenderer.invoke('fetch-consoles', extension),

  fetchRoms: (extension: string, consoleId: string, page: number) => ipcRenderer.invoke('fetch-roms', extension, consoleId, page),

  fetchRomDetails: (extension: string, romUrl: string) => ipcRenderer.invoke('fetch-rom-details', extension, romUrl),

  fetchRomDownloadUrls: (extension: string, romUrl: string) => ipcRenderer.invoke('fetch-rom-download-urls', extension, romUrl),

  selectDownloadPath: () => ipcRenderer.invoke('select-download-path'),

  fetchEmulators: () => ipcRenderer.invoke('fetch-emulators'),

  searchRoms: (extension: string, page: number, searchTerm: string) => ipcRenderer.invoke('search-roms', extension, page, searchTerm),

  testDownload: (url: string) => ipcRenderer.invoke('test-download', url),

  
})

contextBridge.exposeInMainWorld('settings', {

  get: (key: string) => ipcRenderer.invoke('settings:get', key),

  set: (key: string, value: string) => ipcRenderer.invoke('settings:set', key, value),

})

contextBridge.exposeInMainWorld('download', {

  downloadEmulator: (emulatorUrl: string, emulatorName: string) => ipcRenderer.invoke('download-emulator', emulatorUrl, emulatorName),

  downloadRom: (romUrl: string, romName: string, consoleId: string, extension: string) => ipcRenderer.invoke('download-rom', romUrl, romName, consoleId, extension),

})

contextBridge.exposeInMainWorld('emulators', {

  get: (emulatorName: string) => ipcRenderer.invoke('emulators:get', emulatorName),

  getAll: () => ipcRenderer.invoke('emulators:get-all'),

  remove: (emulatorName: string) => ipcRenderer.invoke('emulators:remove', emulatorName),

})