import z from "zod";

export const createRoomSchema = z.object({
    name: z.string().min(1),
});

export const createTokenSchema = z.object({
    roomName: z.string().min(1),
    participantName: z.string().min(1),
});


export type CreateRoomDto = z.infer<typeof createRoomSchema>;
export type CreateTokenDto = z.infer<typeof createTokenSchema>;


export const LivekkiteRoomDecoder = {
    createRoom: (data: unknown) => createRoomSchema.safeParse(data),
    createToken: (data: unknown) => createTokenSchema.safeParse(data),
}