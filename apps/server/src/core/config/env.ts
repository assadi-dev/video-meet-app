import z from "zod";

const portSchema = z.coerce.number().int().min(1).max(65535);

const env_schema = z.object({
  HTTP_PORT: portSchema,
  LIVEKIT_URL: z.string().url(),
  LIVEKIT_API_KEY: z.string().min(1),
  LIVEKIT_API_SECRET: z.string().min(1),
  CORS_ORIGIN: z.string().min(1).default("http://localhost:3000"),
});

const result = env_schema.safeParse(process.env);

if (!result.success) {
  console.error("❌ Invalid env variables:", result.error.format());
  process.exit(1);
} else {
  console.log("✅ safe load env variable with success");
}

export const ENV = result.data;
