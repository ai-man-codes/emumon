import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('api', {

  fetchConsoles: (extension: string) => ipcRenderer.invoke('fetch-consoles', extension),

  fetchRoms: (extension: string, consoleId: string) => ipcRenderer.invoke('fetch-roms', extension, consoleId),

  fetchRomDetails: (extension: string, romUrl: string) => ipcRenderer.invoke('fetch-rom-details', extension, romUrl),

  fetchRomDownloadUrls: (extension: string, romUrl: string) => ipcRenderer.invoke('fetch-rom-download-urls', extension, romUrl),
  
})