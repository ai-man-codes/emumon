import { ipcMain } from "electron";
import romStore from "../store/roms/store";
import { RomStoreType } from "../store/roms/schema";
import fs from "fs/promises";
import path from "path";
import fs2 from "fs";

ipcMain.handle('romLibrary:getAll', () => {
    return romStore.get('roms');
});

ipcMain.handle('romLibrary:remove', async (_, romName: string) => {
    const roms = romStore.get('roms');
    const deletedRom = roms.find((r) => r.name === romName);

    if (!deletedRom) return;

    const deletedRomPath = path.join(deletedRom.romPath);

    if(fs2.existsSync(deletedRomPath)) await fs.rmdir(deletedRomPath, { recursive: true });

    roms.splice(roms.findIndex((r) => r.name === romName), 1);
    romStore.set('roms', roms);
    return roms;
});

ipcMain.handle('romLibrary:get', (_, romName: string) => {
    const roms = romStore.get('roms');
    return roms.find((r) => r.name === romName);
});

async function addRomToLibrary(rom: RomStoreType) {
    if (rom.name in romStore.get('roms')) {
        throw new Error('Rom already exists in library');
    }
    
    romStore.set('roms', [...romStore.get('roms'), rom]);
}

export default addRomToLibrary;