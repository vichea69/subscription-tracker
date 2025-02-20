import { config } from 'dotenv';

// Ensure the correct environment file is loaded
config({ path: `.env.${process.env.NODE_ENV || 'devlopment'}.local` });

console.log(`Loaded PORT: ${process.env.PORT}, NODE_ENV: ${process.env.NODE_ENV}`);

export const {
    PORT,
    NODE_ENV,
    DB_URL,
    JWT_SECRET,
    JWT_EXPIRE,
} = process.env;