import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
    dialect: 'postgresql',  // Try this if 'pg' is no longer supported
    schema: './src/lib/db/schema.ts',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
} satisfies Config;