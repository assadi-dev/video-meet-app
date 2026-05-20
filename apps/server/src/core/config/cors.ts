import { CorsOptions } from "cors";
import { ENV } from "@config/env";

const allowedOrigins = ENV.CORS_ORIGIN.split(",").map((o) => o.trim());
const isProd = process.env.NODE_ENV === "production";

export const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        // En dev, autoriser les requêtes sans origin (Postman, server-to-server)
        if (!origin && !isProd) return callback(null, true);
        if (origin && allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error(`Origin ${origin ?? "unknown"} not allowed by CORS`));
    },
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400,
};
