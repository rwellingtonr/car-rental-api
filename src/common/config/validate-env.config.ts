import { z } from 'zod';

const envSchema = z.object({
	DATABASE_URL: z.string().url(),
	NODE_ENV: z.enum(['development', 'production']).default('development'),
	PORT: z.coerce.number().default(3000),
	JWT_SECRET: z.string().min(10),
});

export function validateEnv(config: Record<string, unknown>) {
	const result = envSchema.safeParse(config);

	if (!result.success) {
		const formattedErrors = result.error.flatten().fieldErrors;
		const message = `Missing or invalid environment variables:\n${JSON.stringify(formattedErrors, null, 2)}`;

		console.error(message);
		throw new Error(message);
	}

	return result.data;
}
