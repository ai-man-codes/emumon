import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('api', {

  fetchConsoles: (extension: string) => ipcRenderer.invoke('fetch-consoles', extension),

  fetchRoms: (extension: string, consoleId: string, page: number) => ipcRenderer.invoke('fetch-roms', extension, consoleId, page),

  fetchRomDetails: (extension: string, romUrl: string) => ipcRenderer.invoke('fetch-rom-details', extension, romUrl),

  fetchRomDownloadUrls: (extension: string, romUrl: string) => ipcRenderer.invoke('fetch-rom-download-urls', extension, romUrl),

  selectDownloadPath: () => ipcRenderer.invoke('select-download-path'),

  fetchEmulators: () => ipcRenderer.invoke('fetch-emulators'),

  searchRoms: (extension: string, page: number, searchTerm: string) => ipcRenderer.invoke('search-roms', extension, page, searchTerm),
  
})

contextBridge.exposeInMainWorld('settings', {
  get: (key: string) => ipcRenderer.invoke('settings:get', key),
  set: (key: string, value: string) => ipcRenderer.invoke('settings:set', key, value),
})