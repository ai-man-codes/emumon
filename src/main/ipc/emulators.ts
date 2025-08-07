import { ipcMain } from 'electron'
import emulatorsStore from '../store/emulators/store'
import fs from 'fs/promises'

ipcMain.handle('emulators:get', async (_, emulatorName: string) => {
    return emulatorsStore.get(emulatorName)
})

ipcMain.handle('emulators:get-all', async (_) => {
    const emulators = emulatorsStore.store
    
    return Object.entries(emulators).map(([key, value]) => ({ emulatorName: key, downloadPath: value }))
    
})

ipcMain.handle('emulators:remove', async (_, emulatorName: string) => {

    const allEmulators = Object.entries(emulatorsStore.store)

    if (!emulatorName) throw new Error('Emulator name is required')
    if (!emulatorsStore.has(emulatorName)) throw new Error('Emulator not found')

    const emulatorPath = allEmulators.find(([key, _]) => key === emulatorName)?.[1]

    if (!emulatorPath) throw new Error('Emulator path not found')

    try {
        const stat = await fs.stat(emulatorPath)
        if (stat.isDirectory()) {
            await fs.rm(emulatorPath, { recursive: true })
        }
    } catch (error) {
        console.error(error)
    }

    return emulatorsStore.delete(emulatorName)
})

function addEmulator(emulatorName: string, downloadPath: string) {
    if (!emulatorName) throw new Error('Emulator name is required')
    if (!downloadPath) throw new Error('Download path is required')

    return emulatorsStore.set(emulatorName, downloadPath)
}

export default addEmulator;