import { SupabaseSetup } from "./supabaseSetup";

export async function setupDatabase(): Promise<void> {
  if (!process.env.DATABASE_URL) {
    console.log("No DATABASE_URL found - skipping database setup");
    return;
  }

  try {
    // Test connection
    const connectionSuccess = await SupabaseSetup.testConnection();
    if (!connectionSuccess) {
      console.log("❌ Database connection failed - skipping setup");
      throw new Error('Database connection test failed');
    }

    // Initialize tables
    await SupabaseSetup.initializeTables();
    
    // Seed organizations
    await SupabaseSetup.seedOrganizations();
    
    // Show connection info
    await SupabaseSetup.getConnectionInfo();

    console.log("🎉 Supabase database setup completed successfully!");
    
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    throw error;
  }
}

