import { db, isConnected } from "../storage";

// Test database connection first
async function testDatabaseConnection(): Promise<boolean> {
  if (!isConnected) {
    console.log('❌ Database not connected - check DATABASE_URL format');
    return false;
  }
  
  try {
    const result = await db.execute('SELECT 1 as test');
    console.log('✅ Database connection test successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    return false;
  }
}

export async function setupDatabase(): Promise<void> {
  if (!process.env.DATABASE_URL) {
    console.log("No DATABASE_URL found - skipping database setup");
    return;
  }

  // Test connection first
  const isConnected = await testDatabaseConnection();
  if (!isConnected) {
    console.log("❌ Database connection failed - skipping setup");
    throw new Error('Database connection test failed');
  }

  try {
    console.log("✅ Database connected - setting up tables...");

    // Create organization_domains table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS organization_domains (
        id SERIAL PRIMARY KEY,
        domain TEXT NOT NULL UNIQUE,
        organization_name TEXT NOT NULL,
        type TEXT NOT NULL
      );
    `);

    // Create organization_invitations table
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

    // Create waitlist_signups table
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

    // Create indexes for better performance
    await db.execute(`
      CREATE INDEX IF NOT EXISTS idx_org_domains_domain ON organization_domains(domain);
    `);
    
    await db.execute(`
      CREATE INDEX IF NOT EXISTS idx_org_invitations_email ON organization_invitations(email);
    `);
    
    await db.execute(`
      CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_signups(email);
    `);

    console.log("✅ Database tables created successfully");

    // Check if organization domains need seeding
    const count = await db.execute(`SELECT COUNT(*) as count FROM organization_domains`);
    if (count.rows[0].count === "0") {
      console.log("Seeding organization domains...");
      await seedOrganizationDomains();
    }

  } catch (error) {
    console.error("❌ Database setup failed:", error);
    throw error;
  }
}

async function seedOrganizationDomains(): Promise<void> {
  const organizations = [
    // Universities
    { domain: 'harvard.edu', name: 'Harvard University', type: 'university' },
    { domain: 'stanford.edu', name: 'Stanford University', type: 'university' },
    { domain: 'mit.edu', name: 'MIT', type: 'university' },
    { domain: 'berkeley.edu', name: 'UC Berkeley', type: 'university' },
    { domain: 'ox.ac.uk', name: 'Oxford University', type: 'university' },
    { domain: 'cam.ac.uk', name: 'Cambridge University', type: 'university' },
    { domain: 'caltech.edu', name: 'Caltech', type: 'university' },
    { domain: 'princeton.edu', name: 'Princeton University', type: 'university' },
    { domain: 'yale.edu', name: 'Yale University', type: 'university' },
    { domain: 'columbia.edu', name: 'Columbia University', type: 'university' },
    { domain: 'uchicago.edu', name: 'University of Chicago', type: 'university' },
    { domain: 'upenn.edu', name: 'University of Pennsylvania', type: 'university' },
    { domain: 'cornell.edu', name: 'Cornell University', type: 'university' },
    { domain: 'ucla.edu', name: 'UCLA', type: 'university' },
    { domain: 'jhu.edu', name: 'Johns Hopkins University', type: 'university' },
    { domain: 'duke.edu', name: 'Duke University', type: 'university' },
    { domain: 'northwestern.edu', name: 'Northwestern University', type: 'university' },
    { domain: 'nyu.edu', name: 'NYU', type: 'university' },
    { domain: 'umich.edu', name: 'University of Michigan', type: 'university' },
    { domain: 'utoronto.ca', name: 'University of Toronto', type: 'university' },

    // Companies
    { domain: 'google.com', name: 'Google', type: 'company' },
    { domain: 'meta.com', name: 'Meta', type: 'company' },
    { domain: 'microsoft.com', name: 'Microsoft', type: 'company' },
    { domain: 'apple.com', name: 'Apple', type: 'company' },
    { domain: 'amazon.com', name: 'Amazon', type: 'company' },
    { domain: 'nvidia.com', name: 'Nvidia', type: 'company' },
    { domain: 'tesla.com', name: 'Tesla', type: 'company' },
    { domain: 'openai.com', name: 'OpenAI', type: 'company' },
    { domain: 'ycombinator.com', name: 'Y Combinator', type: 'company' },
    { domain: 'goldmansachs.com', name: 'Goldman Sachs', type: 'company' },
    { domain: 'mckinsey.com', name: 'McKinsey & Company', type: 'company' },
    { domain: 'stripe.com', name: 'Stripe', type: 'company' },
    { domain: 'airbnb.com', name: 'Airbnb', type: 'company' },
    { domain: 'netflix.com', name: 'Netflix', type: 'company' },
    { domain: 'uber.com', name: 'Uber', type: 'company' },
    { domain: 'salesforce.com', name: 'Salesforce', type: 'company' },
  ];

  for (const org of organizations) {
    try {
      await db.execute(`
        INSERT INTO organization_domains (domain, organization_name, type) 
        VALUES ('${org.domain}', '${org.name}', '${org.type}')
        ON CONFLICT (domain) DO NOTHING
      `);
    } catch (error) {
      console.error(`Failed to insert ${org.domain}:`, error);
    }
  }

  console.log(`✅ Seeded ${organizations.length} organization domains`);
}