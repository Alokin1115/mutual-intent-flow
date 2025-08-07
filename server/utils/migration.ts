import { db } from "../storage";
import { organizationDomains, organizationInvitations, waitlistSignups } from "../../shared/schema";

export class MigrationUtils {
  static async createTablesIfNotExists(): Promise<void> {
    if (!process.env.DATABASE_URL) {
      console.log("Skipping table creation - no database connection");
      return;
    }

    try {
      console.log("Checking database tables...");
      
      // Create tables using raw SQL since Drizzle migrations might not be set up
      await db.execute(`
        CREATE TABLE IF NOT EXISTS organization_domains (
          id SERIAL PRIMARY KEY,
          domain TEXT NOT NULL UNIQUE,
          organization_name TEXT NOT NULL,
          type TEXT NOT NULL
        );
      `);

      await db.execute(`
        CREATE TABLE IF NOT EXISTS organization_invitations (
          id SERIAL PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          organization TEXT NOT NULL,
          is_verified BOOLEAN DEFAULT FALSE,
          verification_token TEXT,
          created_at TIMESTAMP DEFAULT NOW(),
          verified_at TIMESTAMP
        );
      `);

      await db.execute(`
        CREATE TABLE IF NOT EXISTS waitlist_signups (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          linkedin_x TEXT NOT NULL,
          reason TEXT NOT NULL,
          is_verified BOOLEAN DEFAULT FALSE,
          verification_token TEXT,
          is_approved BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT NOW(),
          verified_at TIMESTAMP,
          approved_at TIMESTAMP
        );
      `);

      console.log("Database tables ready");
    } catch (error) {
      console.error("Error creating tables:", error);
      // Don't throw - let the app continue with mock functionality
    }
  }

  static async seedOrganizations(): Promise<void> {
    // This will be called from OrganizationService.initializeOrganizations()
    // when the database is available
  }
}