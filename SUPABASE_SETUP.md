# 🚀 Supabase Database Setup Guide

## Current Issue
Your DATABASE_URL is using a **Transaction Pooler** connection which is incompatible with our Neon serverless driver.

## ✅ Step-by-Step Fix

### 1. Get Correct Connection String
1. Open your **Supabase Dashboard**
2. Navigate to **Settings** → **Database**
3. Scroll to **Connection string** section
4. Click **URI** tab (NOT "Transaction pooler")
5. Copy the connection string that looks like:

```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
```

### 2. Replace Password Placeholder
Replace `[YOUR-PASSWORD]` with your actual database password (the one you set when creating the Supabase project).

### 3. Update DATABASE_URL Secret
1. In Replit, go to **Secrets** tab (lock icon)
2. Find `DATABASE_URL` 
3. Update it with your corrected connection string
4. The server will automatically restart

## 🎯 What You'll See After Fix
Once the correct URL is set, you'll see:
- ✅ Database connection initialized with Supabase direct connection
- ✅ Database connection test successful
- ✅ Database connected - setting up tables...
- ✅ Database tables created successfully
- ✅ Seeded X organization domains

## ❌ Wrong Format (Don't Use)
```
postgresql://postgres.[PROJECT]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

## ✅ Correct Format (Use This)
```
postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
```

## 🔍 Troubleshooting
- Make sure your database password is correct
- Ensure there are no extra spaces in the connection string
- The PROJECT-ID should match your Supabase project reference

Once fixed, all database features will work:
- Organization email validation
- Waitlist signups
- Invitation tracking
- Full backend functionality