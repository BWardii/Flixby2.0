/*
  # Fix call logs table and policies

  1. Changes
    - Add IF NOT EXISTS to policy creation
    - Keep table and index creation unchanged
    - Ensure idempotent execution
*/

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS call_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id text NOT NULL,
  assistant_id text NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  duration_seconds integer NOT NULL,
  status text NOT NULL CHECK (status IN ('completed', 'failed', 'interrupted')),
  error_message text,
  transcript text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS if not already enabled
ALTER TABLE call_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can insert their own call logs" ON call_logs;
  DROP POLICY IF EXISTS "Users can view their own call logs" ON call_logs;
END $$;

-- Create policies
CREATE POLICY "Users can insert their own call logs"
  ON call_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM assistants
      WHERE assistant_id = call_logs.assistant_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their own call logs"
  ON call_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM assistants
      WHERE assistant_id = call_logs.assistant_id
      AND user_id = auth.uid()
    )
  );

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_call_logs_assistant_id ON call_logs(assistant_id);
CREATE INDEX IF NOT EXISTS idx_call_logs_created_at ON call_logs(created_at DESC);