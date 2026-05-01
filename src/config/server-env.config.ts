import { z } from "zod";

/**
 * Server-only environment variable validation.
 *
 * ⚠️  NEVER import this into client components or pages.
 *     These values are secret and must remain on the server.
 */

const serverEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required and cannot be empty."),

  GOOGLE_SITE_VERIFICATION: z
    .string()
    .optional()
    .transform((val) => val?.trim() || undefined),

  PORT: z.coerce.number().default(3000),
});

const parsed = serverEnvSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
    .join("\n");

  throw new Error(
    `❌ Invalid server environment variables:\n${issues}\n\n` +
      `Please check your .env file or deployment settings and try again.`
  );
}

export const serverEnv = parsed.data;

export type ServerEnv = z.infer<typeof serverEnvSchema>;
