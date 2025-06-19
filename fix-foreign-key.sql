-- ============================================================================
-- Fix Foreign Key Constraint for Clerk Integration
-- ============================================================================
-- This removes the foreign key constraint from profiles.id that was pointing
-- to auth.users, since we're now using Clerk for authentication
-- ============================================================================

-- First, let's see what constraints exist
SELECT 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_name='profiles';

-- Drop the foreign key constraint (replace constraint_name if different)
ALTER TABLE profiles 
DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Also drop the constraint that links to auth.users if it exists
ALTER TABLE profiles 
DROP CONSTRAINT IF EXISTS profiles_user_id_fkey;

-- Make the id column a regular UUID primary key (not a foreign key)
-- If needed, we can also change it to auto-generate UUIDs
ALTER TABLE profiles 
ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- Verify the changes
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default 
FROM information_schema.columns 
WHERE table_name = 'profiles' 
    AND column_name IN ('id', 'clerk_user_id');

-- ============================================================================
-- Alternative: If you prefer to keep it simple, just use clerk_user_id as primary
-- ============================================================================
-- If the above doesn't work, we can restructure to use clerk_user_id as primary:
-- 
-- ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_pkey;
-- ALTER TABLE profiles ADD PRIMARY KEY (clerk_user_id);
-- ALTER TABLE profiles ALTER COLUMN id DROP NOT NULL;
-- ============================================================================ 