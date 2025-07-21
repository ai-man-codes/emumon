import { create } from 'zustand'

type ExtensionStore = {
    extension: string;
    consoleId: string;
    romTitle: string;
    setExtension: (ext: string) => void;
    setConsoleId: (consoleId: string) => void;
    setRomTitle: (title: string) => void;
};

const useExtensionStore = create<ExtensionStore>((set) => ({
    extension: '',
    consoleId: '',
    romTitle: '',
    setExtension: (ext) => set({ extension: ext }),
    setConsoleId: (consoleId) => set({ consoleId }),
    setRomTitle: (title) => set({ romTitle: title })
}));

export default useExtensionStore;