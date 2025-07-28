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

    const allEmulators = Object.entries(emulatorsStore.store)

    if (!emulatorName) throw new Error('Emulator name is required')
    if (!emulatorsStore.has(emulatorName as EmulatorKeys)) throw new Error('Emulator not found')

    const emulatorPath = allEmulators.find(([key, value]) => key === emulatorName)?.[1]

    if (!emulatorPath) throw new Error('Emulator path not found')

    try {
        const stat = await fs.stat(emulatorPath)
        if (stat.isDirectory()) {
            await fs.rmdir(emulatorPath, { recursive: true })
        }
    } catch (error) {
        console.error(error)
    }

    console.log(emulatorsStore.store)

    return emulatorsStore.delete(emulatorName as EmulatorKeys)
})

function addEmulator(emulatorName: string, downloadPath: string) {
    if (!emulatorName) throw new Error('Emulator name is required')

    if (!downloadPath) throw new Error('Download path is required')

    return emulatorsStore.set(emulatorName, downloadPath)
}

export default addEmulator;