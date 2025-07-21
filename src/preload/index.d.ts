import { ElectronAPI } from '@electron-toolkit/preload'
import { RomDetails } from '@/main/types/romDetails'
import { Console } from '@/main/types/console'
import { Rom } from '@/main/types/rom'
import { DownloadRom } from '@/main/types/downloadRom'

declare global {
  interface Window {
    api: {

      fetchConsoles: (extension: string) => Promise<Console[]>,

      fetchRoms: (extension: string, consoleId: string) => Promise<Rom[]>,

      fetchRomDetails: (extension: string, romUrl: string) => Promise<RomDetails>,

      fetchRomDownloadUrls: (extension: string, romUrl: string) => Promise<DownloadRom[]>,

      selectDownloadPath: () => Promise<string>,

    }
  }
}
