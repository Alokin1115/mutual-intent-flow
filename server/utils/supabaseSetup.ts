import { db, isConnected, connectionMethod } from "../storage";

export class SupabaseSetup {
  static async testConnection(): Promise<boolean> {
    if (!isConnected) {
      console.log('❌ Database connection not established');
      return false;
    }

    try {
      const result = await db.execute('SELECT NOW() as current_time, version() as pg_version');
      console.log('✅ Supabase connection successful');
      console.log(`🔗 Connection method: ${connectionMethod}`);
      console.log(`📊 PostgreSQL version: ${result.rows[0].pg_version.split(' ')[0]}`);
      return true;
    } catch (error) {
      console.error('❌ Supabase connection test failed:', error);
      console.error(`🔗 Connection method attempted: ${connectionMethod}`);
      return false;
    }
  }

  static async initializeTables(): Promise<void> {
    if (!isConnected) {
      console.log('⚠️ Skipping table creation - database not connected');
      return;
    }

    try {
      // Create extensions
      await db.execute(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
      
      // Create organization_domains table
      await db.execute(`
        CREATE TABLE IF NOT EXISTS organization_domains (
          id SERIAL PRIMARY KEY,
          domain TEXT NOT NULL UNIQUE,
          organization_name TEXT NOT NULL,
          type TEXT NOT NULL CHECK (type IN ('university', 'company')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )
      `);

      // Create organization_invitations table
      await db.execute(`
        CREATE TABLE IF NOT EXISTS organization_invitations (
          id SERIAL PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          organization TEXT NOT NULL,
          domain TEXT NOT NULL,
          is_verified BOOLEAN DEFAULT FALSE,
          verification_token UUID DEFAULT uuid_generate_v4(),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          verified_at TIMESTAMP WITH TIME ZONE,
          metadata JSONB DEFAULT '{}'::jsonb
        )
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
          verification_token UUID DEFAULT uuid_generate_v4(),
          is_approved BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          verified_at TIMESTAMP WITH TIME ZONE,
          approved_at TIMESTAMP WITH TIME ZONE,
          metadata JSONB DEFAULT '{}'::jsonb
        )
      `);

      // Create indexes for performance
      await db.execute(`
        CREATE INDEX IF NOT EXISTS idx_org_domains_domain ON organization_domains(domain);
        CREATE INDEX IF NOT EXISTS idx_org_domains_type ON organization_domains(type);
        CREATE INDEX IF NOT EXISTS idx_org_invitations_email ON organization_invitations(email);
        CREATE INDEX IF NOT EXISTS idx_org_invitations_domain ON organization_invitations(domain);
        CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_signups(email);
        CREATE INDEX IF NOT EXISTS idx_waitlist_approved ON waitlist_signups(is_approved);
      `);

      console.log('✅ All database tables and indexes created successfully');
      
    } catch (error) {
      console.error('❌ Failed to create tables:', error);
      throw error;
    }
  }

  static async seedOrganizations(): Promise<void> {
    if (!isConnected) {
      console.log('⚠️ Skipping seeding - database not connected');
      return;
    }

    try {
      // Check if already seeded
      const count = await db.execute(`SELECT COUNT(*) as count FROM organization_domains`);
      if (parseInt(count.rows[0].count as string) > 0) {
        console.log(`✅ Organization domains already seeded (${count.rows[0].count} entries)`);
        return;
      }

      const organizations = [
        // Top Universities
        { domain: 'harvard.edu', name: 'Harvard University', type: 'university' },
        { domain: 'stanford.edu', name: 'Stanford University', type: 'university' },
        { domain: 'mit.edu', name: 'Massachusetts Institute of Technology', type: 'university' },
        { domain: 'berkeley.edu', name: 'UC Berkeley', type: 'university' },
        { domain: 'ox.ac.uk', name: 'University of Oxford', type: 'university' },
        { domain: 'cam.ac.uk', name: 'University of Cambridge', type: 'university' },
        { domain: 'caltech.edu', name: 'California Institute of Technology', type: 'university' },
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
        { domain: 'nyu.edu', name: 'New York University', type: 'university' },
        { domain: 'umich.edu', name: 'University of Michigan', type: 'university' },
        { domain: 'utoronto.ca', name: 'University of Toronto', type: 'university' },
        { domain: 'imperial.ac.uk', name: 'Imperial College London', type: 'university' },
        { domain: 'ethz.ch', name: 'ETH Zurich', type: 'university' },
        { domain: 'tsinghua.edu.cn', name: 'Tsinghua University', type: 'university' },
        { domain: 'pku.edu.cn', name: 'Peking University', type: 'university' },
        { domain: 'nus.edu.sg', name: 'National University of Singapore', type: 'university' },
        { domain: 'lse.ac.uk', name: 'London School of Economics', type: 'university' },
        { domain: 'cmu.edu', name: 'Carnegie Mellon University', type: 'university' },
        { domain: 'brown.edu', name: 'Brown University', type: 'university' },
        { domain: 'dartmouth.edu', name: 'Dartmouth College', type: 'university' },
        { domain: 'iitb.ac.in', name: 'IIT Bombay', type: 'university' },
        { domain: 'iitd.ac.in', name: 'IIT Delhi', type: 'university' },

        // Top Companies
        { domain: 'google.com', name: 'Google', type: 'company' },
        { domain: 'meta.com', name: 'Meta', type: 'company' },
        { domain: 'microsoft.com', name: 'Microsoft', type: 'company' },
        { domain: 'apple.com', name: 'Apple', type: 'company' },
        { domain: 'amazon.com', name: 'Amazon', type: 'company' },
        { domain: 'netflix.com', name: 'Netflix', type: 'company' },
        { domain: 'tesla.com', name: 'Tesla', type: 'company' },
        { domain: 'openai.com', name: 'OpenAI', type: 'company' },
        { domain: 'nvidia.com', name: 'Nvidia', type: 'company' },
        { domain: 'spacex.com', name: 'SpaceX', type: 'company' },
        { domain: 'stripe.com', name: 'Stripe', type: 'company' },
        { domain: 'airbnb.com', name: 'Airbnb', type: 'company' },
        { domain: 'uber.com', name: 'Uber', type: 'company' },
        { domain: 'salesforce.com', name: 'Salesforce', type: 'company' },
        { domain: 'oracle.com', name: 'Oracle', type: 'company' },
        { domain: 'ibm.com', name: 'IBM', type: 'company' },
        { domain: 'adobe.com', name: 'Adobe', type: 'company' },
        { domain: 'intel.com', name: 'Intel', type: 'company' },
        { domain: 'goldmansachs.com', name: 'Goldman Sachs', type: 'company' },
        { domain: 'jpmorganchase.com', name: 'JPMorgan Chase', type: 'company' },
        { domain: 'mckinsey.com', name: 'McKinsey & Company', type: 'company' },
        { domain: 'bcg.com', name: 'Boston Consulting Group', type: 'company' },
        { domain: 'bain.com', name: 'Bain & Company', type: 'company' },
        { domain: 'deloitte.com', name: 'Deloitte', type: 'company' },
        { domain: 'pwc.com', name: 'PwC', type: 'company' },
        { domain: 'ey.com', name: 'EY', type: 'company' },
        { domain: 'kpmg.com', name: 'KPMG', type: 'company' },
        { domain: 'palantir.com', name: 'Palantir', type: 'company' },
        { domain: 'coinbase.com', name: 'Coinbase', type: 'company' },
        { domain: 'tiktok.com', name: 'TikTok', type: 'company' },
        { domain: 'bytedance.com', name: 'ByteDance', type: 'company' },
      ];

      // Insert organizations in batches for better performance
      console.log(`Seeding ${organizations.length} organization domains...`);
      
      for (const org of organizations) {
        await db.execute(`
          INSERT INTO organization_domains (domain, organization_name, type) 
          VALUES ($1, $2, $3)
          ON CONFLICT (domain) DO NOTHING
        `, [org.domain, org.name, org.type]);
      }

      const finalCount = await db.execute(`SELECT COUNT(*) as count FROM organization_domains`);
      console.log(`✅ Successfully seeded ${finalCount.rows[0].count} organization domains`);
      
    } catch (error) {
      console.error('❌ Failed to seed organizations:', error);
      throw error;
    }
  }

  static async getConnectionInfo(): Promise<void> {
    if (!isConnected) {
      console.log('❌ No database connection established');
      return;
    }

    try {
      const info = await db.execute(`
        SELECT 
          current_database() as database,
          current_user as user,
          inet_server_addr() as host,
          inet_server_port() as port
      `);
      
      console.log('📊 Database Connection Info:');
      console.log(`   Database: ${info.rows[0].database}`);
      console.log(`   User: ${info.rows[0].user}`);
      console.log(`   Host: ${info.rows[0].host}`);
      console.log(`   Port: ${info.rows[0].port}`);
      
    } catch (error) {
      console.error('❌ Failed to get connection info:', error);
    }
  }
}