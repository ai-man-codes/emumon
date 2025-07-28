import { z } from 'zod';

export const emulatorSchema = z.object({})

export type Emulator = z.infer<typeof emulatorSchema>;

export type EmulatorKeys = keyof Emulator;