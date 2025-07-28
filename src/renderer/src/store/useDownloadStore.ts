import { create } from "zustand";

interface DownloadStore {
  downloadPath: string;
  downloadHappened: boolean;
  setDownloadPath: (path: string) => void;
  setDownloadHappened: (happened: boolean) => void;
}

export const useDownloadStore = create<DownloadStore>((set) => ({
  downloadPath: "",
  downloadHappened: false,
  setDownloadPath: (path) => set({ downloadPath: path }),
  setDownloadHappened: (happened) => set({ downloadHappened: happened }),
}));