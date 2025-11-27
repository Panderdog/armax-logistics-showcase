-- ============================================
-- ARMAX LOGISTICS - Applications Table Setup
-- ============================================
-- Run this SQL in Supabase SQL Editor (supabase.com -> your project -> SQL Editor)

-- 1. Create the applications table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS policies

-- Policy: Allow anonymous users to INSERT new applications
-- This allows the contact form to submit applications without authentication
CREATE POLICY "Allow anonymous insert" ON public.applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users (admin) to SELECT all applications
-- This allows the admin panel to read all applications
CREATE POLICY "Allow authenticated select" ON public.applications
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users (admin) to UPDATE applications
-- This allows the admin to change application status
CREATE POLICY "Allow authenticated update" ON public.applications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Allow authenticated users (admin) to DELETE applications
CREATE POLICY "Allow authenticated delete" ON public.applications
  FOR DELETE
  TO authenticated
  USING (true);

-- 4. Create an index for faster queries by status
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);

-- 5. Create an index for sorting by creation date
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON public.applications(created_at DESC);

-- ============================================
-- IMPORTANT: After running this SQL, make sure:
-- 1. RLS is enabled (check in Authentication -> Policies)
-- 2. Anon key has INSERT permission (should work automatically with the policy above)
-- 3. For admin panel to work, you'll need to implement authentication with Supabase Auth
-- ============================================

