import { ElectronAPI } from '@electron-toolkit/preload'
import { RomDetails } from '@/main/types/romDetails'
import { Console } from '@/main/types/console'
import { Rom } from '@/main/types/rom'
import { DownloadRom } from '@/main/types/downloadRom'
import { Emulator } from '@/main/types/emulator'
import { SearchRom } from '@/main/types/searchRom'
import { RomStoreType } from '@/main/store/roms/schema'
import { SendDownloadProgress } from '@/main/lib/aria2/arai2Client'

declare global {
  interface Window {
    api: {

      fetchConsoles: (extension: string) => Promise<Console[]>,

      fetchRoms: (extension: string, consoleId: string, page: number) => Promise<{ roms: Rom[], pageCount: number }>,

      fetchRomDetails: (extension: string, romUrl: string) => Promise<RomDetails>,

      fetchRomDownloadUrls: (extension: string, romUrl: string) => Promise<DownloadRom[]>,

      selectDownloadPath: () => Promise<string>,

      fetchEmulators: () => Promise<Emulator[]>,

      searchRoms: (extension: string, page: number, searchTerm: string) => Promise<{ roms: SearchRom[], pageCount: number }>,

      testDownload: (url: string) => Promise<void>,

    },

    settings: {

      get: (key: string) => Promise<string>,
      set: (key: string, value: string) => Promise<string>

    },

    download: {

      downloadEmulator: (emulatorUrl: string, emulatorName: string) => Promise<void>,

      downloadRom: (romUrl: string, romName: string, consoleId: string, extension: string, imageUrl: string) => Promise<string>,

      onDownloadProgress: (callback: (data: SendDownloadProgress) => void) => void,

    },

    emulators: {

      get: (emulatorName: string) => Promise<Emulator>,

      remove: (emulatorName: string) => Promise<void>,

      getAll: () => Promise<{ emulatorName: string, downloadPath: string }[]>

    },

    romLibrary: {

      getAll: () => Promise<RomStoreType[]>,

      remove: (romName: string) => Promise<void>,

      get: (romName: string) => Promise<RomStoreType>,

    },

    launch: {

      launchEmulator: (emulatorName: string) => Promise<void>,

      launchRom: (ronName: string, consoleId: string, extenison: string) => Promise<void>,

    }

  }
}
