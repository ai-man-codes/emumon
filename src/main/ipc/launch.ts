import { ipcMain } from "electron";
import { launchEmulator } from "../launch/launchEmulator";

ipcMain.handle('launch-emulator', async (_, emulatorName: string) => {
    await launchEmulator(emulatorName)
})