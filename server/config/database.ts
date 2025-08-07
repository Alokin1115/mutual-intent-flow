// Database configuration for easy server migration
export const DATABASE_CONFIG = {
  // Set this to your Supabase connection string
  // Format: postgresql://[user]:[password]@[host]:[port]/[database]?sslmode=require
  url: process.env.DATABASE_URL,
  
  // Alternative: Set individual components if needed
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  
  // Connection settings
  ssl: process.env.NODE_ENV === 'production' ? 'require' : 'prefer',
  maxConnections: 20,
  
  // Health check
  isConfigured(): boolean {
    return Boolean(this.url || (this.host && this.database && this.username && this.password));
  },
  
  // Build connection string from components
  buildConnectionString(): string | null {
    if (this.url) return this.url;
    
    if (this.host && this.database && this.username && this.password) {
      return `postgresql://${this.username}:${this.password}@${this.host}:${this.port}/${this.database}?sslmode=${this.ssl}`;
    }
    
    return null;
  }
};

// Instructions for different deployment scenarios
export const DEPLOYMENT_INSTRUCTIONS = {
  supabase: {
    description: "Using Supabase as your database provider",
    steps: [
      "1. Go to your Supabase project dashboard",
      "2. Navigate to Settings > Database",
      "3. Copy the connection string from 'Connection string' > 'URI'",
      "4. Use the 'Transaction pooler' version for better performance",
      "5. Set DATABASE_URL environment variable with this connection string"
    ]
  },
  
  neon: {
    description: "Using Neon as your database provider",
    steps: [
      "1. Go to your Neon console",
      "2. Select your project and database",
      "3. Copy the connection string from the connection details",
      "4. Set DATABASE_URL environment variable"
    ]
  },
  
  railway: {
    description: "Deploying to Railway",
    steps: [
      "1. Create a new Railway project",
      "2. Add a PostgreSQL database service",
      "3. Copy DATABASE_URL from the database service variables",
      "4. Set it in your app service environment variables"
    ]
  },
  
  render: {
    description: "Deploying to Render",
    steps: [
      "1. Create a PostgreSQL database on Render",
      "2. Copy the External Database URL",
      "3. Set DATABASE_URL environment variable in your web service"
    ]
  },
  
  vercel: {
    description: "Deploying to Vercel with external database",
    steps: [
      "1. Use an external database provider (Supabase, Neon, PlanetScale)",
      "2. Get the connection string from your provider",
      "3. Add DATABASE_URL to your Vercel environment variables",
      "4. Redeploy your application"
    ]
  }
};