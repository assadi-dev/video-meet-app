import { Router } from "express";
import { container } from "tsyringe";
import { TOKENS } from "../../injection/tokens";
import { LiveKitService } from "./LiveKitService";

const livekitRouter = Router();

livekitRouter.post("/rooms/token", async (req, res, next) => {
    try {
        const { roomName, participantName } = req.body;
        if (!roomName || !participantName) {
            return res.status(400).json({ message: "roomName and participantName are required" });
        }
        const livekitService = container.resolve<LiveKitService>(TOKENS.liveKitService);
        const token = await livekitService.generateToken(roomName, participantName);
        return res.json({ token });
    } catch (err) {
        next(err);
    }
});

livekitRouter.get("/rooms", async (_req, res, next) => {
    try {
        const livekitService = container.resolve<LiveKitService>(TOKENS.liveKitService);
        const rooms = await livekitService.listRooms();
        return res.json(rooms);
    } catch (err) {
        next(err);
    }
});

livekitRouter.post("/rooms", async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "name is required" });
        const livekitService = container.resolve<LiveKitService>(TOKENS.liveKitService);
        const room = await livekitService.createRoom(name);
        return res.status(201).json(room);
    } catch (err) {
        next(err);
    }
});

livekitRouter.delete("/rooms/:name", async (req, res, next) => {
    try {
        const livekitService = container.resolve<LiveKitService>(TOKENS.liveKitService);
        await livekitService.deleteRoom(req.params.name);
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
});

export default livekitRouter;
