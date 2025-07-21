import { create } from 'zustand'

type PathStore = {
    romsPath: string;
    consolesPath: string;
    setRomsPath: (path: string) => void;
    setConsolesPath: (path: string) => void;
}

const usePathStore = create<PathStore>((set) => ({
    romsPath: '',
    consolesPath: '',
    setRomsPath: (path) => set({ romsPath: path }),
    setConsolesPath: (path) => set({ consolesPath: path })
}))

export default usePathStore;