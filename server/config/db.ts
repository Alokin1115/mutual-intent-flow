import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

// Initialize database connection with proper URL encoding
let db: ReturnType<typeof drizzle> | null = null;
let pool: Pool | null = null;

export function initializeDatabase() {
  if (!process.env.DATABASE_URL) {
    console.log('No DATABASE_URL found - database operations disabled');
    return null;
  }

  try {
    // Handle URL encoding for special characters in password
    const connectionString = process.env.DATABASE_URL.replace(/(:)([^@:]+)(@)/, (match, colon, password, at) => {
      return colon + encodeURIComponent(password) + at;
    });
    
    pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
    
    db = drizzle(pool);
    console.log('✅ Database connection initialized');
    return db;
  } catch (error) {
    console.error('❌ Failed to initialize database:', error);
    return null;
  }
}

export function getDatabase() {
  if (!db) {
    return initializeDatabase();
  }
  return db;
}

export async function testConnection() {
  const database = getDatabase();
  if (!database) return false;
  
  try {
    await database.execute('SELECT 1');
    console.log('✅ Database connection test successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    return false;
  }
}

export { db, pool };