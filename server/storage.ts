import { users, type User, type InsertUser } from "@shared/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// Database connection - optimized for serverless/pooler
let db: any;

if (process.env.DATABASE_URL) {
  try {
    // Use the original DATABASE_URL (should be pooler format for serverless)
    const sql = neon(process.env.DATABASE_URL);
    db = drizzle(sql);
    console.log('✅ Database connection initialized with Neon serverless driver');
  } catch (error) {
    console.error('❌ Failed to initialize database:', error);
    db = createMockDb();
  }
} else {
  console.warn("DATABASE_URL not found - database operations will be disabled");
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

export { db };

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
