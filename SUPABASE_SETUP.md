# Supabase Setup Guide

This project supports both Mock API (default) and Supabase as the backend. Follow these steps to use Supabase:

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Wait for the project to be ready

## 2. Create the Database Table

In your Supabase dashboard, go to the SQL Editor and run this query:

```sql
-- Create the tasks table
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  isCompleted BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (for demo purposes)
-- In production, you'd want more restrictive policies
CREATE POLICY "Allow all operations" ON tasks FOR ALL USING (true) WITH CHECK (true);

-- Create an index for better performance
CREATE INDEX idx_tasks_created_at ON tasks(createdAt DESC);
```

## 3. Get Your Supabase Credentials

1. Go to your project settings
2. Copy the **Project URL** and **anon/public key**
3. Create a `.env` file in your project root with:

```env
# API Configuration
VITE_USE_SUPABASE=true

# Supabase Configuration
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 4. Test the Setup

1. Start your development server: `npm run dev`
2. You should see "Using Supabase API" in the console
3. Try creating, updating, and deleting tasks
4. Check your Supabase dashboard to see the data

## 5. Switch Back to Mock API

To switch back to the mock API, either:
- Delete the `.env` file, or
- Set `VITE_USE_SUPABASE=false` in your `.env` file

## Features

- ✅ **Real Database**: Tasks persist in Supabase
- ✅ **Real-time Updates**: Supabase provides real-time capabilities
- ✅ **Scalable**: Can handle production workloads
- ✅ **Secure**: Row Level Security enabled
- ✅ **Fallback**: Automatically falls back to Mock API if Supabase is not configured

## API Contract Compliance

The Supabase implementation follows the exact same API contract:

- `GET /tasks` - Retrieve all tasks
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task