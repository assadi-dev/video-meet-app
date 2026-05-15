import * as z from "zod";

export const JoinRoomSchema = z.object({
    roomId: z.string().min(1),
});

export type JoinRoomFormType = z.infer<typeof JoinRoomSchema>;