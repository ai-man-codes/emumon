interface RomMetadata {
    publishedDate: string;
    emulator: string;
    downloadCount: number;
}

export interface RomDetails {
    name: string;
    downloadPageUrl: string;
    imageUrl: string;
    metadata: RomMetadata;
}
