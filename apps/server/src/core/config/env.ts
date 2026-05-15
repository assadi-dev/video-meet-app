import z from "zod";

const portSchema = z.coerce.number().int().min(1).max(65535);

const env_schema = z.object({
  HTTP_PORT: portSchema,
  WS_PORT: portSchema,
  MEDIASOUP_LISTEN_IP: z.string().min(1),
  MEDIASOUP_ANNOUNCED_IP: z.string().min(1),
  MEDIASOUP_MIN_PORT: portSchema,
  MEDIASOUP_MAX_PORT: portSchema,
  SSL_KEY_PATH: z.string().min(1),
  SSL_CERT_PATH: z.string().min(1),
});

const result = env_schema.safeParse(process.env);

if (!result.success) {
  console.error("❌ Invalid env variables:", result.error.format());
  process.exit(1);
} else {
  console.log("✅ safe load env variable with success");
}

export const ENV = result.data;
