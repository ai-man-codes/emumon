import fs from "fs/promises"

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

export async function getConsoleData(consoleId: string): Promise<{ consoleExtensions: string[], consoleExec: string, emulatorName: string }> {
    const emulatorsFile = await fs.readFile("./src/main/emulators/emulators_extended.json", "utf-8");
    const emulatorsObj: Record<string, consoleI> = JSON.parse(emulatorsFile);

    for (const [key, value] of Object.entries(emulatorsObj)) {
        if (key === consoleId) {
            return {
                consoleExtensions: value.extensions,
                consoleExec: value.emulators[0].executable,
                emulatorName: value.emulators[0].name
            };
        }
    }

    return {
        consoleExtensions: [],
        consoleExec: "",
        emulatorName: "",
    };
}
