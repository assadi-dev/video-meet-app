export const fetchRoomToken = async (roomName: string, participantName: string): Promise<string> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomName, participantName }),
    });
    if (!res.ok) throw new Error("Failed to fetch room token");
    const data = await res.json();
    return data.token as string;
};
