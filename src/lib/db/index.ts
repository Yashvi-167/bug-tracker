import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// This safely defaults to a throw if env config is not found or creates a sql client
// Make sure you have DATABASE_URL defined in your environment (e.g. .env.local)
const sql = neon(process.env.DATABASE_URL || 'postgresql://placeholder:placeholder@placeholder.neon.tech/placeholder?sslmode=require');
export const db = drizzle(sql, { schema });
