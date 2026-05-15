import z from "zod";

export const deviceSchema = z.object({
    id: z.string(),
    label: z.string(),
    value: z.string(),
});
export const ConfigurationFormSchema = z.object({
    displayName: z.string().min(1),
    videoSource: z.string().nullable(),
    videoEnabled: z.boolean(),
    audioSource: z.string().nullable(),
    audioEnabled: z.boolean(),
});

export type deviceSchemaType = z.infer<typeof deviceSchema>;
export type ConfigurationFormType = z.infer<typeof ConfigurationFormSchema>;