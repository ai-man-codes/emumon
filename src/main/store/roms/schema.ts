import { z } from 'zod';

export const romSchema = z.object({
    name: z.string(),
    consoleId: z.string(),
    extension: z.string(),
    romPath: z.string(),
    imagePath: z.string(),
});

export const romLibrarySchema = z.array(romSchema);

export type RomStoreType = z.infer<typeof romSchema>;