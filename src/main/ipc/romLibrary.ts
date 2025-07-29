import { ipcMain } from "electron";
import romStore from "../store/roms/store";
import { RomStoreType } from "../store/roms/schema";
import { keyof } from "zod";

ipcMain.handle('romLibrary:getAll', () => {
    return romStore.get('roms');
});

ipcMain.handle('romLibrary:remove', (_, romName: string) => {
    const roms = romStore.get('roms');
    roms.splice(roms.findIndex((r) => r.name === romName), 1);
    romStore.set('roms', roms);
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