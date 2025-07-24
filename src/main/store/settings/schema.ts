import { z } from 'zod'

export const settingsSchema = z.object({
  downloadPath: z.string().default(''),
})

export type Settings = z.infer<typeof settingsSchema>

export type SettingsKeys = keyof Settings