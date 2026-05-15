import "reflect-metadata";
import { injectable } from "tsyringe";
import { AccessToken, RoomServiceClient } from "livekit-server-sdk";
import { ENV } from "@config/env";

@injectable()
export class LiveKitService {
    private roomService: RoomServiceClient;

    constructor() {
        const httpUrl = ENV.LIVEKIT_URL.replace(/^ws/, "http");
        this.roomService = new RoomServiceClient(httpUrl, ENV.LIVEKIT_API_KEY, ENV.LIVEKIT_API_SECRET);
    }

    async generateToken(roomName: string, participantName: string): Promise<string> {
        const token = new AccessToken(ENV.LIVEKIT_API_KEY, ENV.LIVEKIT_API_SECRET, {
            identity: participantName,
            ttl: "10m",
        });
        token.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });
        return await token.toJwt();
    }

    listRooms() {
        return this.roomService.listRooms();
    }

    createRoom(name: string) {
        return this.roomService.createRoom({ name });
    }

    deleteRoom(name: string) {
        return this.roomService.deleteRoom(name);
    }
}
