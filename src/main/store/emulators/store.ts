import Store from 'electron-store';
import { emulatorSchema, Emulator } from './schema';

const emulatorsStore = new Store<Emulator>({
    defaults: emulatorSchema.parse({}),
    name: 'emulators',
});

export default emulatorsStore;