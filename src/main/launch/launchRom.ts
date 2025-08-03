import emulatorsStore from "../store/emulators/store";
import romStore from "../store/roms/store";
import { getConsoleData } from "./getConsoleData";
import { spawn } from "child_process";
import path from "path"
import fs from "fs/promises"
import { execFile } from "child_process";

async function getRomFiles(romPath: string, consoleExtensions: string[]): Promise<string[]> {

    // console.log(romStore.get("roms"))

    try {
        const files = await fs.readdir(romPath)

        const romFiles = files.filter((file) => {
            const ext = path.extname(file).toLowerCase().replace(".", "")
            return consoleExtensions.includes(ext);
        })

        return romFiles;

    } catch (error) {
        console.error("Failed to load rom files");
        return []
    }
}

function runRom(emulatorExec: string, romFilePath: string) {
    const child = spawn(emulatorExec, [romFilePath], {
        detached: true,
        stdio: 'ignore',
    })

    child.unref()
}

export async function launchRom(romName: string, consoleId: string, extension: string) {

    const sanitizedRomName = romName.replace(/[<>:"/\\|?*]/g, '_');
    
    const { consoleExtensions, consoleExec, emulatorName } = await getConsoleData(consoleId)

    const emulatorPath = emulatorsStore.get(emulatorName)
    const emulatorExec = path.join(emulatorPath, consoleExec)

    const rom = romStore.get("roms").find((r) => r.name === romName)

    if (!rom) return
    const romFile = await getRomFiles(rom.romPath, consoleExtensions)
    const romFilePath = path.join(rom.romPath, romFile[0])

    console.log(emulatorExec, '\n', romFilePath, '\n')

    runRom(emulatorExec, romFilePath)

}