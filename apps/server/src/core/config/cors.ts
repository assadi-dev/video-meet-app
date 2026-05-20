import { CorsOptions } from "cors";
import { ENV } from "@config/env";

const allowedOrigins = ENV.CORS_ORIGIN.split(",").map((o) => o.trim());

export const corsOptions: CorsOptions = {
    origin: allowedOrigins,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400,
};
