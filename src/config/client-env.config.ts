import { z } from "zod";

/**
 * Client-safe (public) environment variable validation.
 *
 * ✅ Safe to import in client components, pages, and server code.
 * These variables are prefixed with NEXT_PUBLIC_ and are inlined at build time.
 */

const clientEnvSchema = z.object({
  NEXT_PUBLIC_CALENDLY_URL: z
    .string()
    .optional()
    .transform((val) => val?.trim() || undefined),
});

const parsed = clientEnvSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
    .join("\n");

  throw new Error(
    `❌ Invalid client environment variables:\n${issues}\n\n` +
      `Please check your .env file or deployment settings and try again.`,
  );
}

export const clientEnv = parsed.data;

export type ClientEnv = z.infer<typeof clientEnvSchema>;
