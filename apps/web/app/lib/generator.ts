export const generateRoomId = (): string => {
    return crypto.randomUUID();
};