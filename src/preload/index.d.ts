import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    api: {
      fetchConsoles: (extension: string) => Promise<any>,
      fetchRoms: (extension: string, consoleId: string) => Promise<any>,
    }
  }
}
