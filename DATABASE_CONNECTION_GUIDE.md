# Supabase Database Connection Guide

## Issue Detected
Your current DATABASE_URL is using the **Transaction Pooler** format which won't work with our Neon serverless driver.

## ✅ Correct Connection String Format

You need the **Direct Connection** string instead:

1. Go to your Supabase project dashboard
2. Navigate to **Settings** > **Database**
3. In the **Connection string** section, look for **URI** (not Transaction pooler)
4. Copy the connection string that looks like:

```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

**NOT** the pooler version that looks like:
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

## 🔧 How to Update

1. Get the correct URI format from Supabase
2. Replace `[YOUR-PASSWORD]` with your actual database password
3. Update the DATABASE_URL secret in Replit
4. The system will automatically reconnect

## 🧪 Test Connection
Once updated, you'll see:
- ✅ Database connected
- ✅ Tables created automatically
- ✅ Organization domains seeded
- ✅ Full functionality enabled