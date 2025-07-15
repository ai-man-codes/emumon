import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    api: {
      fetchConsoles: (extension: string) => Promise<any>;
    }
  }
}
