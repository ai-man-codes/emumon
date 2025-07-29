import Store from 'electron-store';
import { RomStoreType } from './schema';

const romStore = new Store<{ roms: RomStoreType[] }>({
    name: 'roms',
    defaults: {
        roms: [],
    },
});

export default romStore;