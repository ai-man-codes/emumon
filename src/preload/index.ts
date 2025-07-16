import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('api', {

  fetchConsoles: (extension: string) => ipcRenderer.invoke('fetch-consoles', extension),

  fetchRoms: (extension: string, consoleId: string) => ipcRenderer.invoke('fetch-roms', extension, consoleId),
  
})