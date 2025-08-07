import { users, type User, type InsertUser } from "@shared/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// Database connection - properly configured for Supabase
let db: any;
let isConnected = false;

if (process.env.DATABASE_URL) {
  try {
    // Check if using pooler URL (not supported with Neon driver)
    if (process.env.DATABASE_URL.includes('pooler.supabase.com')) {
      console.error('❌ INCOMPATIBLE DATABASE URL: Transaction pooler URLs are not supported with Neon driver');
      console.log('📋 Please use the Direct Connection URL instead:');
      console.log('   1. Go to Supabase Dashboard > Settings > Database');
      console.log('   2. Copy URI connection string (NOT Transaction pooler)');
      console.log('   3. Format: postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres');
      db = createMockDb();
    } else {
      // Use direct connection URL
      const sql = neon(process.env.DATABASE_URL);
      db = drizzle(sql);
      isConnected = true;
      console.log('✅ Database connection initialized with Supabase direct connection');
    }
  } catch (error) {
    console.error('❌ Failed to initialize database:', error);
    db = createMockDb();
  }
} else {
  console.warn("DATABASE_URL not found - using fallback mode");
  db = createMockDb();
}

function createMockDb() {
  return {
    select: () => ({ from: () => ({ where: () => ({ limit: () => ({ execute: () => Promise.resolve([]) }) }) }) }),
    insert: () => ({ values: () => ({ execute: () => Promise.resolve() }) }),
    update: () => ({ set: () => ({ where: () => ({ execute: () => Promise.resolve() }) }) }),
    execute: () => Promise.resolve({ rows: [{ count: '0' }] }),
  };
}

export { db, isConnected };

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
