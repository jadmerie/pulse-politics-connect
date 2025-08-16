-- Fix infinite recursion in campaigns RLS policy
-- Drop the problematic policy that creates circular reference
DROP POLICY IF EXISTS "Users can view campaigns from their PACs or as invited influenc" ON campaigns;

-- Create a simplified policy that only checks PAC ownership (no circular reference)
CREATE POLICY "Users can view their PAC campaigns" ON campaigns 
FOR SELECT USING (
  pac_id IN (SELECT id FROM pacs WHERE admin_user_id = auth.uid())
);