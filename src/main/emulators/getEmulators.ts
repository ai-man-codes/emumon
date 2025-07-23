import { readFile } from 'fs/promises'
import { Emulator } from '../types/emulator'

async function getEmulators(): Promise<Emulator[]> {
    const emulators = await readFile("./src/main/emulators/emulators.json", 'utf-8')
    const emulatorsObj = JSON.parse(emulators)

    const emulatorsList: Emulator[] = []
    
    Object.values(emulatorsObj).map((data: any) => {
        data.emulators.forEach((emulator: any) => {
            emulatorsList.push({
                name: emulator.name,
                downloadUrl: emulator.downloadUrl,
                iconUrl: emulator.iconUrl,
            })
        })
    })

    return emulatorsList
}

// (async () => {
//     const emulators = await getEmulators()
//     console.log(emulators)
// })()

export default getEmulators

