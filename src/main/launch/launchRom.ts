import emulatorsStore from "../store/emulators/store";
import romStore from "../store/roms/store";
import { getConsoleData } from "./getConsoleData";
import { spawn } from "child_process";
import path from "path"
import fs from "fs/promises"

async function getRomFiles(romPath: string, consoleExtensions: string[]): Promise<string[]> {

    // console.log(romStore.get("roms"))

    try {
        const files = await fs.readdir(romPath)

        console.log(files)

        const romFiles = files.filter((file) => {
            const ext = path.extname(file).toLowerCase().replace(".", "")
            return consoleExtensions.includes(ext);
        })

        console.log(romFiles)

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

    console.log(sanitizedRomName, extension)
    
    const { consoleExtensions, consoleExec, emulatorName } = await getConsoleData(consoleId)
    console.log(emulatorsStore.get(emulatorName), consoleExec)

    console.log(consoleExtensions, consoleExec, emulatorName)

    const emulatorPath = String(emulatorsStore.get(emulatorName))
    const emulatorExec = path.join(emulatorPath, consoleExec)

    console.log(emulatorExec)

    const rom = romStore.get("roms").find((r) => r.name === romName)

    if (!rom) return
    const romFile = await getRomFiles(rom.romPath, consoleExtensions)
    console.log(romFile)
    const romFilePath = path.join(rom.romPath, romFile[0])

    console.log(emulatorExec, '\n', romFilePath, '\n')

    runRom(emulatorExec, romFilePath)

}