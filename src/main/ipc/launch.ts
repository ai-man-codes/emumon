import { ipcMain } from "electron";
import { launchEmulator } from "../launch/launchEmulator";
import { launchRom } from "../launch/launchRom";

ipcMain.handle('launch-emulator', async (_, emulatorName: string) => {
    await launchEmulator(emulatorName)
})

ipcMain.handle('launch-rom', async (_, romName: string, consoleId: string, extension: string) => {
    await launchRom(romName, consoleId, extension)
})