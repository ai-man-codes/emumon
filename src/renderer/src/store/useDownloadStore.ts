import { create } from "zustand";

interface DownloadStore {
  downloadPath: string;
  setDownloadPath: (path: string) => void;
}

export const useDownloadStore = create<DownloadStore>((set) => ({
  downloadPath: "",
  setDownloadPath: (path) => set({ downloadPath: path }),
}));