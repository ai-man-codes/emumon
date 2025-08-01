const consoleMap: Record<string, string[]> = {
    "PSP": ["psp", "playstation portable"],
    "PS2": ["ps2", "playstation 2"],
    "GBA": ["gba", "gameboy advance"],
    "NDS": ["nds", "nintendo ds"],
    "3DS": ["3ds", "nintendo 3ds"],
    "Wii & GC": ['wii', "nintendo wii", "gamecube"],
    "PS3": ["ps3"]
}

export const consoleIdChecker = (consoleId: string): string => {

    const id = consoleId.toLowerCase();

    for(const [name, patterns] of Object.entries(consoleMap)) {
        if(patterns.some((pattern) => id.includes(pattern))) {
            return name
        }
    }

    return consoleId
}