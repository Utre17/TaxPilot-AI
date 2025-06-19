-- ============================================================================
-- Supabase Migration: Add Clerk Integration to Profiles Table
-- ============================================================================
-- This script adds the necessary columns and indexes to integrate Clerk
-- authentication with your existing Supabase profiles table.
-- 
-- Run this in your Supabase SQL Editor:
-- https://app.supabase.com/project/YOUR_PROJECT/sql
-- ============================================================================

-- Add clerk_user_id column to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS clerk_user_id TEXT UNIQUE;

-- Create index for faster lookups on clerk_user_id
CREATE INDEX IF NOT EXISTS idx_profiles_clerk_user_id ON profiles(clerk_user_id);

-- Add comment for documentation
COMMENT ON COLUMN profiles.clerk_user_id IS 'Clerk user ID for authentication integration';

-- Optionally, if you want to make clerk_user_id the primary way to identify users:
-- You can add a constraint to ensure either the old Supabase auth user exists OR clerk_user_id exists
-- ALTER TABLE profiles ADD CONSTRAINT check_user_id_exists 
-- CHECK (id IS NOT NULL OR clerk_user_id IS NOT NULL);

-- ============================================================================
-- Verification Query
-- ============================================================================
-- Run this to verify the changes were applied correctly:
-- 
-- SELECT column_name, data_type, is_nullable, column_default 
-- FROM information_schema.columns 
-- WHERE table_name = 'profiles' AND column_name = 'clerk_user_id';
-- 
-- Should return:
-- column_name   | data_type | is_nullable | column_default
-- clerk_user_id | text      | YES         | null
-- ============================================================================ 