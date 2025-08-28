-- Create auth_states table for state exchange authentication pattern
-- This table stores temporary authentication states that are exchanged for JWT tokens

CREATE TABLE IF NOT EXISTS auth_states (
  id SERIAL PRIMARY KEY,
  state_id UUID NOT NULL UNIQUE,
  token TEXT NOT NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT FALSE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_auth_states_state_id ON auth_states(state_id);
CREATE INDEX IF NOT EXISTS idx_auth_states_expires_at ON auth_states(expires_at);
CREATE INDEX IF NOT EXISTS idx_auth_states_user_id ON auth_states(user_id);

-- Enable Row Level Security
ALTER TABLE auth_states ENABLE ROW LEVEL SECURITY;

-- Create a policy that only allows the service role to access this table
-- Regular users should not be able to access these states directly
CREATE POLICY auth_states_service_role_only ON auth_states
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create a function to automatically delete expired states
CREATE OR REPLACE FUNCTION delete_expired_auth_states()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM auth_states WHERE expires_at < NOW();
END;
$$;

-- Optional: Create a scheduled job to clean up expired states
-- Note: This requires pg_cron extension to be enabled
-- Run this if pg_cron is available:
-- SELECT cron.schedule('cleanup-expired-auth-states', '*/5 * * * *', 'SELECT delete_expired_auth_states();');

-- Add comment for documentation
COMMENT ON TABLE auth_states IS 'Temporary authentication states for Market Mapper state exchange pattern';
COMMENT ON COLUMN auth_states.state_id IS 'Unique state identifier used for exchange';
COMMENT ON COLUMN auth_states.token IS 'JWT token to be exchanged';
COMMENT ON COLUMN auth_states.user_id IS 'User ID who created this state';
COMMENT ON COLUMN auth_states.expires_at IS 'When this state expires and should be deleted';
COMMENT ON COLUMN auth_states.used IS 'Whether this state has been exchanged (for audit purposes)';