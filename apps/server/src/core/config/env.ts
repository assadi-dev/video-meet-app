import z from "zod";

const portSchema = z.coerce.number().int().min(1).max(65535);

const env_schema = z.object({
  HTTP_PORT: portSchema,
  WS_PORT: portSchema,

});

const result = env_schema.safeParse(process.env);

if (!result.success) {
  console.error("❌ Invalid env variables:", result.error.format());
  process.exit(1);
} else {
  console.log("✅ safe load env variable with success");
}

export const ENV = result.data;
