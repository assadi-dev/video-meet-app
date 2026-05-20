import { CorsOptions } from "cors";
import { ENV } from "@config/env";

const allowedOrigins = ENV.CORS_ORIGIN.split(",").map((o) => o.trim());

export const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        // Allow server-to-server requests (no origin header)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400,
};

