import { z } from 'zod';

export const EnvSchema = z.object({
  OPENAI_API_KEY: z.string().min(20, 'OPENAI_API_KEY must be provided'),
  JSPUTER_API_KEY: z.string().optional(),
  LLM7_API_KEY: z.string().optional(),
  NODE_ENV: z.string().default('production'),
  GITHUB_TOKEN: z.string().optional(),
  GITHUB_REPOSITORY: z.string().optional(),
  GITHUB_SHA: z.string().optional(),
});

export type Env = z.infer<typeof EnvSchema>;

export const env: Env = EnvSchema.parse(process.env);