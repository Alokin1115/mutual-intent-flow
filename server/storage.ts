import { users, type User, type InsertUser } from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// Database connection - conditional setup
let db: any;

if (process.env.DATABASE_URL) {
  const sql = neon(process.env.DATABASE_URL);
  db = drizzle(sql);
} else {
  console.warn("DATABASE_URL not found - database operations will be disabled");
  // Create a mock db object for development
  db = {
    select: () => ({ from: () => ({ where: () => ({ limit: () => ({ execute: () => Promise.resolve([]) }) }) }) }),
    insert: () => ({ values: () => ({ execute: () => Promise.resolve() }) }),
    update: () => ({ set: () => ({ where: () => ({ execute: () => Promise.resolve() }) }) }),
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
