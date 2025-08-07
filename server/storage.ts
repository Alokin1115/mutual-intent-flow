import { users, type User, type InsertUser } from "@shared/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import postgres from "postgres";
import { drizzle as drizzlePg } from "drizzle-orm/postgres-js";

// Database connection - multi-driver approach for Supabase
let db: any;
let isConnected = false;
let connectionMethod = 'none';

if (process.env.DATABASE_URL) {
  // Always try postgres-js driver first as it's more reliable for Supabase
  console.log('🔄 Attempting database connection with postgres-js driver...');
  
  try {
    // URL encode the connection string to handle special characters
    let connectionUrl = process.env.DATABASE_URL;
    console.log(`🔍 Connection URL format: ${connectionUrl.includes('pooler') ? 'Transaction Pooler (IPv4 Compatible)' : 'Direct Connection'}`);
    
    const urlMatch = connectionUrl.match(/postgresql:\/\/([^:]+):([^@]+)@(.+)/);
    if (urlMatch) {
      const [, username, password, hostAndDb] = urlMatch;
      const encodedPassword = encodeURIComponent(password);
      connectionUrl = `postgresql://${username}:${encodedPassword}@${hostAndDb}`;
      console.log(`🔒 Password encoded for special characters`);
    }
    
    const sql = postgres(connectionUrl, {
      ssl: { rejectUnauthorized: false },
      max: 1,
      idle_timeout: 20,
      connect_timeout: 10,
      connection: {
        application_name: 'mutualbook-railway'
      }
    });
    
    db = drizzlePg(sql);
    isConnected = true;
    connectionMethod = 'postgres-js';
    console.log('✅ Database connection initialized with postgres-js driver');
    
  } catch (primaryError: any) {
    console.error('❌ postgres-js connection failed:', primaryError?.message || primaryError);
    console.log('🔄 Attempting Neon HTTP fallback...');
    
    try {
      // Fallback to Neon HTTP driver (only for direct URLs, not pooler URLs)
      if (!process.env.DATABASE_URL.includes('pooler')) {
        let connectionUrl = process.env.DATABASE_URL;
        const urlMatch = connectionUrl.match(/postgresql:\/\/([^:]+):([^@]+)@(.+)/);
        if (urlMatch) {
          const [, username, password, hostAndDb] = urlMatch;
          const encodedPassword = encodeURIComponent(password);
          connectionUrl = `postgresql://${username}:${encodedPassword}@${hostAndDb}`;
        }
        
        const sql = neon(connectionUrl);
        db = drizzle(sql);
        isConnected = true;
        connectionMethod = 'neon-http';
        console.log('✅ Database connection established with Neon HTTP driver');
      } else {
        throw new Error('Transaction pooler URLs not compatible with Neon HTTP driver');
      }
      
    } catch (fallbackError: any) {
      console.error('❌ All connection methods failed');
      console.error('Primary error:', primaryError?.message || primaryError);
      console.error('Fallback error:', fallbackError?.message || fallbackError);
      console.log('📋 Using mock database mode - API will return fallback data');
      db = createMockDb();
      connectionMethod = 'mock';
      isConnected = false;
    }
  }
} else {
  console.warn("📋 No DATABASE_URL found - using mock database mode");
  db = createMockDb();
  connectionMethod = 'mock';
  isConnected = false;
}

function createMockDb() {
  return {
    select: () => ({ from: () => ({ where: () => ({ limit: () => ({ execute: () => Promise.resolve([]) }) }) }) }),
    insert: () => ({ values: () => ({ execute: () => Promise.resolve() }) }),
    update: () => ({ set: () => ({ where: () => ({ execute: () => Promise.resolve() }) }) }),
    execute: () => Promise.resolve({ rows: [{ count: '0' }] }),
  };
}

export { db, isConnected, connectionMethod };

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
