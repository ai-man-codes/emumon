import path from "path";
import { execFile } from "child_process";
import emulatorsStore from "../store/emulators/store";
import { getEmulatorLaunchData } from "./getemulatorLaunchData";

export async function launchEmulator(emulatorName: string) {
    const { extensions, executable } = await getEmulatorLaunchData(emulatorName)

    if(!extensions || !executable) return

    const eumulatorSavePath = emulatorsStore.get(emulatorName)

    const emulatorExecPath = path.join(eumulatorSavePath, executable)

    execFile(emulatorExecPath, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
            console.log(`Output:\n${stdout}`);
    })

    console.log(emulatorsStore.store)
    console.log(emulatorExecPath)

}