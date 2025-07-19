import { ElectronAPI } from '@electron-toolkit/preload'
import { RomDetails } from '@/main/types/romDetails'
import { Console } from '@/main/types/console'
import { Rom } from '@/main/types/rom'

declare global {
  interface Window {
    
    api: {

      fetchConsoles: (extension: string) => Promise<Console[]>,

      fetchRoms: (extension: string, consoleId: string) => Promise<Rom[]>,

      fetchRomDetails: (extension: string, romId: string) => Promise<RomDetails>,

    }
  }
}
