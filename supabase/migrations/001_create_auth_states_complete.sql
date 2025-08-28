-- Complete migration for auth_states table and related functions
-- Run this entire script in Supabase SQL Editor

-- ============================================
-- 1. ENABLE EXTENSIONS
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 2. CREATE AUTH_STATES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.auth_states (
  id SERIAL PRIMARY KEY,
  state_id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '5 minutes'),
  used BOOLEAN DEFAULT FALSE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_auth_states_state_id ON public.auth_states(state_id);
CREATE INDEX IF NOT EXISTS idx_auth_states_expires_at ON public.auth_states(expires_at);
CREATE INDEX IF NOT EXISTS idx_auth_states_user_id ON public.auth_states(user_id);

-- Add documentation
COMMENT ON TABLE public.auth_states IS 'Temporary authentication states for Market Mapper state exchange pattern';
COMMENT ON COLUMN public.auth_states.state_id IS 'Unique state identifier used for exchange';
COMMENT ON COLUMN public.auth_states.token IS 'JWT token to be exchanged';
COMMENT ON COLUMN public.auth_states.user_id IS 'User ID who created this state';
COMMENT ON COLUMN public.auth_states.expires_at IS 'When this state expires and should be deleted';
COMMENT ON COLUMN public.auth_states.used IS 'Whether this state has been exchanged (for audit purposes)';

-- ============================================
-- 3. CREATE ATOMIC EXCHANGE FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION public.exchange_auth_state(state_id_param UUID)
RETURNS TABLE(token TEXT, user_id UUID) 
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  state_record RECORD;
BEGIN
  -- Get token and delete in one atomic operation
  DELETE FROM public.auth_states
  WHERE state_id = state_id_param
    AND expires_at > NOW()
    AND used = FALSE
  RETURNING auth_states.token, auth_states.user_id INTO state_record;

  IF state_record.token IS NOT NULL THEN
    RETURN QUERY SELECT state_record.token, state_record.user_id;
  ELSE
    -- Return empty if not found, expired, or already used
    RETURN;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.exchange_auth_state(UUID) TO anon, authenticated;

COMMENT ON FUNCTION public.exchange_auth_state IS 'Atomically exchange a state ID for its token (single-use)';

-- ============================================
-- 4. CREATE CLEANUP FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION public.cleanup_expired_auth_states()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.auth_states 
  WHERE expires_at < NOW();
END;
$$;

COMMENT ON FUNCTION public.cleanup_expired_auth_states IS 'Remove expired authentication states';

-- ============================================
-- 5. SET UP ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.auth_states ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Service role can do everything" ON public.auth_states;
DROP POLICY IF EXISTS "Users can view their own states" ON public.auth_states;

-- Service role can do everything (for backend operations)
CREATE POLICY "Service role can do everything" ON public.auth_states
  FOR ALL 
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Authenticated users can only view their own states (optional, for debugging)
CREATE POLICY "Users can view their own states" ON public.auth_states
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================
-- 6. OPTIONAL: AUTOMATIC CLEANUP WITH PG_CRON
-- ============================================
-- Uncomment these lines if pg_cron is enabled in your Supabase project:

-- SELECT cron.schedule(
--   'cleanup-expired-auth-states',
--   '*/5 * * * *', -- Every 5 minutes
--   'SELECT public.cleanup_expired_auth_states();'
-- );

-- ============================================
-- 7. VERIFICATION QUERIES
-- ============================================
-- Run these to verify the migration succeeded:

-- Check table exists and has correct structure
SELECT 
  'auth_states table created' as status,
  COUNT(*) as column_count
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'auth_states';

-- Check function exists
SELECT 
  'exchange_auth_state function created' as status,
  COUNT(*) as function_count
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name = 'exchange_auth_state';

-- Check RLS is enabled
SELECT 
  'RLS enabled on auth_states' as status,
  relrowsecurity as rls_enabled
FROM pg_class
WHERE relname = 'auth_states';

-- ============================================
-- 8. TEST THE SETUP (OPTIONAL)
-- ============================================
-- Uncomment to test the exchange function:

-- Insert a test state
-- INSERT INTO public.auth_states (user_id, token)
-- VALUES (NULL, 'test-token-' || gen_random_uuid())
-- RETURNING state_id;

-- Use the returned state_id in the next query:
-- SELECT * FROM public.exchange_auth_state('YOUR-STATE-ID'::UUID);

-- Verify it was deleted (should return 0):
-- SELECT COUNT(*) FROM public.auth_states WHERE state_id = 'YOUR-STATE-ID'::UUID;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
SELECT '✅ Migration complete! auth_states table and functions are ready.' as message;