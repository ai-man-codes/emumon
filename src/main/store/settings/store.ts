import Store from 'electron-store';
import { settingsSchema, Settings } from './schema';

const settingsStore = new Store<Settings>({
  defaults: settingsSchema.parse({}),
  name: 'settings',
});

export default settingsStore;