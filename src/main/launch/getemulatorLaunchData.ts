import { val } from "cheerio/dist/commonjs/api/attributes";
import fs from "fs/promises";

type emulatorI = {
    name: string,
    consoleName: string,
    downloadUrl: string,
    iconUrl: string,
    executable: string,
}

type consoleI = {
    extensions: string[],
    emulators: emulatorI[],
}

export async function getEmulatorLaunchData(emulatorName: string): Promise<{ extensions: string[], executable: string }> {
    const emulatorsFile = await fs.readFile("./src/main/emulators/emulators_extended.json", "utf-8");
    const emulatorsObj: Record<string, consoleI> = await JSON.parse(emulatorsFile)

    for (const console of Object.values(emulatorsObj)) {
        const emulator = console.emulators.find((e) => e.name === emulatorName)
        if (emulator) {
            return {
                extensions: console.extensions,
                executable: emulator.executable
            }
        }
        
    }
    return {
        extensions: [],
        executable: ""
    }
}