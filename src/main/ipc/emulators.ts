import { ipcMain } from 'electron'
import emulatorsStore from '../store/emulators/store'
import { EmulatorKeys } from '../store/emulators/schema'
import fs from 'fs/promises'

ipcMain.handle('emulators:get', async (event, emulatorName: string) => {
    return emulatorsStore.get(emulatorName)
})

ipcMain.handle('emulators:get-all', async (event) => {
    const emulators = emulatorsStore.store
    
    return Object.entries(emulators).map(([key, value]) => ({ emulatorName: key, downloadPath: value }))
    
})

ipcMain.handle('emulators:remove', async (event, emulatorName: string) => {

    if (!emulatorName) throw new Error('Emulator name is required')
    if (!emulatorsStore.has(emulatorName as EmulatorKeys)) throw new Error('Emulator not found')

    await fs.rmdir(emulatorsStore.get(emulatorName as EmulatorKeys), { recursive: true })

    return emulatorsStore.delete(emulatorName as EmulatorKeys)
})

function addEmulator(emulatorName: string, downloadPath: string) {
    if (!emulatorName) throw new Error('Emulator name is required')

    if (!downloadPath) throw new Error('Download path is required')

    return emulatorsStore.set(emulatorName, downloadPath)
}

export default addEmulator;