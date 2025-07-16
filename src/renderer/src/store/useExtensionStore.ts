import { create } from 'zustand'

type ExtensionStore = {
    extension: string;
    console: string;
    romTitle: string;
    setExtension: (ext: string) => void;
    setConsle: (console: string) => void;
    setRomTitle: (title: string) => void;
};

const useExtensionStore = create<ExtensionStore>((set) => ({
    extension: '',
    console: '',
    romTitle: '',
    setExtension: (ext) => set({ extension: ext }),
    setConsle: (console) => set({ console}),
    setRomTitle: (title) => set({ romTitle: title })
}));

export default useExtensionStore;