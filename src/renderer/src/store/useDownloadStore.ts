import { create } from "zustand";

interface DownloadStore {
  downloadPath: string;
  downloadHappened: boolean;
  downloads: {
    name: string;
    imageUrl: string;
  }[];
  setDownloadPath: (path: string) => void;
  setDownloadHappened: (happened: boolean) => void;
  setDownloads: (downloads: {
    name: string;
    imageUrl: string;
  }[]) => void;
}

export const useDownloadStore = create<DownloadStore>((set) => ({
  downloadPath: "",
  downloadHappened: false,
  downloads: [],
  setDownloadPath: (path) => set({ downloadPath: path }),
  setDownloadHappened: (happened) => set({ downloadHappened: happened }),
  setDownloads: (downloads) => set({ downloads }),
}));