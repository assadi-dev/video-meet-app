import z from "zod";

export const deviceSchema = z.object({
    id: z.string(),
    label: z.string(),
    value: z.string(),
});
export const ConfigurationFormSchema = z.object({
    displayName: z.string().min(1),
    videoSource: z.string().nullable(),
    audioSource: z.string().nullable(),

});

export type deviceSchemaType = z.infer<typeof deviceSchema>;
export type ConfigurationFormType = z.infer<typeof ConfigurationFormSchema>;