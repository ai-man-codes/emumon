import { z } from 'zod';

export const emulatorSchema = z.object({
    name: z.string(),
    path: z.string(),
    console: z.string(),
})

export type Emulator = z.infer<typeof emulatorSchema>;

export type EmulatorKeys = keyof Emulator;