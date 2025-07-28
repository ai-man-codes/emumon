import { z } from 'zod';

export const emulatorSchema = z.object({
    downloadPath: z.string().default(''),
})

export type Emulator = z.infer<typeof emulatorSchema>;

export type EmulatorKeys = keyof Emulator;