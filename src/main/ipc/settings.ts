import { ipcMain } from "electron";
import settingsStore from "../store/settings/store";

ipcMain.handle('settings:get', (_, key: string) => settingsStore.get(key));

ipcMain.handle('settings:set', (_, key: string, value: string) => settingsStore.set(key, value));