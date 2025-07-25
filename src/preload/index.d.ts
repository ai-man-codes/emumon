import { ElectronAPI } from '@electron-toolkit/preload'
import { RomDetails } from '@/main/types/romDetails'
import { Console } from '@/main/types/console'
import { Rom } from '@/main/types/rom'
import { DownloadRom } from '@/main/types/downloadRom'
import { Emulator } from '@/main/types/emulator'

declare global {
  interface Window {
    api: {

      fetchConsoles: (extension: string) => Promise<Console[]>,

      fetchRoms: (extension: string, consoleId: string, page: number) => Promise<{ roms: Rom[], pageCount: number }>,

      fetchRomDetails: (extension: string, romUrl: string) => Promise<RomDetails>,

      fetchRomDownloadUrls: (extension: string, romUrl: string) => Promise<DownloadRom[]>,

      selectDownloadPath: () => Promise<string>,

      fetchEmulators: () => Promise<Emulator[]>,

    },

    settings: {

      get: (key: string) => Promise<string>,
      set: (key: string, value: string) => Promise<string>

    }
  }
}
