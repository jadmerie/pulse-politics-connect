-- Add diverse content submissions with various statuses
INSERT INTO content_submissions (
  campaign_id, 
  influencer_id, 
  platform, 
  content_type, 
  caption, 
  content_url, 
  status, 
  compliance_checked, 
  fec_disclosure, 
  review_notes,
  submission_date
) VALUES 
-- Pending submissions (4)
(
  (SELECT id FROM campaigns LIMIT 1 OFFSET 0),
  (SELECT id FROM influencers LIMIT 1 OFFSET 0),
  'Instagram',
  'post',
  'Ready to vote for real change! 🇺🇸 #VoteForChange #Election2024',
  'https://instagram.com/p/abc123',
  'pending',
  false,
  NULL,
  NULL,
  NOW() - INTERVAL '2 days'
),
(
  (SELECT id FROM campaigns LIMIT 1 OFFSET 1),
  (SELECT id FROM influencers LIMIT 1 OFFSET 1),
  'TikTok',
  'video',
  'Why your vote matters this election! Link in bio for voter registration 📊',
  'https://tiktok.com/@user/video/123',
  'pending',
  false,
  NULL,
  NULL,
  NOW() - INTERVAL '1 day'
),
(
  (SELECT id FROM campaigns LIMIT 1 OFFSET 2),
  (SELECT id FROM influencers LIMIT 1 OFFSET 2),
  'YouTube',
  'video',
  'Breaking down the candidates positions on healthcare policy',
  'https://youtube.com/watch?v=abc123',
  'pending',
  false,
  NULL,
  NULL,
  NOW() - INTERVAL '3 hours'
),
(
  (SELECT id FROM campaigns LIMIT 1 OFFSET 0),
  (SELECT id FROM influencers LIMIT 1 OFFSET 3),
  'Twitter',
  'post',
  'Just posted my voter guide! Check it out and share with friends 🗳️',
  'https://twitter.com/user/status/123',
  'pending',
  false,
  NULL,
  NULL,
  NOW() - INTERVAL '6 hours'
),
-- Revision requested submissions (3)
(
  (SELECT id FROM campaigns LIMIT 1 OFFSET 1),
  (SELECT id FROM influencers LIMIT 1 OFFSET 4),
  'Instagram',
  'story',
  'Vote for candidate X! They''re the best choice for America!',
  'https://instagram.com/stories/user/123',
  'revision_requested',
  false,
  NULL,
  'Missing required FEC disclosure statement. Please add "Paid for by [PAC Name]" to comply with campaign finance regulations.',
  NOW() - INTERVAL '5 days'
),
(
  (SELECT id FROM campaigns LIMIT 1 OFFSET 2),
  (SELECT id FROM influencers LIMIT 1 OFFSET 5),
  'Facebook',
  'post',
  'This candidate will fix everything wrong with our country!',
  'https://facebook.com/posts/123',
  'revision_requested',
  false,
  'Paid for by Future PAC',
  'Content contains unsubstantiated claims. Please provide factual information and avoid hyperbolic language per FEC guidelines.',
  NOW() - INTERVAL '4 days'
),
(
  (SELECT id FROM campaigns LIMIT 1 OFFSET 0),
  (SELECT id FROM influencers LIMIT 1 OFFSET 6),
  'TikTok',
  'video',
  'Here''s why you should vote! #sponsored #politics',
  'https://tiktok.com/@user/video/456',
  'revision_requested',
  false,
  NULL,
  'Hashtag #sponsored is insufficient for political content. Must include full FEC-compliant disclosure statement.',
  NOW() - INTERVAL '6 days'
),
-- Additional approved submissions (2)
(
  (SELECT id FROM campaigns LIMIT 1 OFFSET 1),
  (SELECT id FROM influencers LIMIT 1 OFFSET 7),
  'Instagram',
  'post',
  'Exercise your right to vote! Every voice matters in our democracy. 🗳️ Paid for by Future Forward PAC',
  'https://instagram.com/p/def456',
  'approved',
  true,
  'Paid for by Future Forward PAC',
  'Content approved - includes proper FEC disclosure and factual messaging.',
  NOW() - INTERVAL '1 week'
),
(
  (SELECT id FROM campaigns LIMIT 1 OFFSET 2),
  (SELECT id FROM influencers LIMIT 1 OFFSET 0),
  'YouTube',
  'video',
  'Understanding ballot measures in your area - nonpartisan voter education. Paid for by Civic Engagement PAC',
  'https://youtube.com/watch?v=ghi789',
  'approved',
  true,
  'Paid for by Civic Engagement PAC',
  'Educational content approved - maintains nonpartisan stance with proper disclosure.',
  NOW() - INTERVAL '10 days'
),
-- Mixed priority submissions (3)
(
  (SELECT id FROM campaigns LIMIT 1 OFFSET 0),
  (SELECT id FROM influencers LIMIT 1 OFFSET 1),
  'Twitter',
  'post',
  'Democracy works when we all participate! Register to vote today. Link: vote.gov',
  'https://twitter.com/user/status/789',
  'approved',
  true,
  'Paid for by Democracy First PAC',
  'Excellent civic engagement content with proper disclosure.',
  NOW() - INTERVAL '2 weeks'
),
(
  (SELECT id FROM campaigns LIMIT 1 OFFSET 1),
  (SELECT id FROM influencers LIMIT 1 OFFSET 2),
  'Instagram',
  'reel',
  'Quick facts about candidate policies - swipe for sources!',
  'https://instagram.com/reel/jkl012',
  'pending',
  false,
  NULL,
  NULL,
  NOW() - INTERVAL '8 hours'
),
(
  (SELECT id FROM campaigns LIMIT 1 OFFSET 2),
  (SELECT id FROM influencers LIMIT 1 OFFSET 3),
  'Facebook',
  'video',
  'Town hall highlights: What matters to our community',
  'https://facebook.com/videos/345',
  'approved',
  true,
  'Paid for by Community Voice PAC',
  'Community-focused content with appropriate disclosure.',
  NOW() - INTERVAL '3 weeks'
);

-- Create audit_logs table for compliance tracking
CREATE TABLE public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id UUID NOT NULL,
  user_id UUID NOT NULL,
  user_email TEXT,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for audit_logs
CREATE POLICY "Users can view audit logs for their campaigns" 
ON public.audit_logs 
FOR SELECT 
USING (
  target_type = 'content_submission' AND
  target_id IN (
    SELECT cs.id 
    FROM content_submissions cs
    JOIN campaigns c ON cs.campaign_id = c.id
    JOIN pacs p ON c.pac_id = p.id
    WHERE p.admin_user_id = auth.uid()
  )
);

CREATE POLICY "Users can create audit logs for their actions" 
ON public.audit_logs 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

-- Create compliance_rules table for configurable compliance checks
CREATE TABLE public.compliance_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  rule_type TEXT NOT NULL, -- 'fec_disclosure', 'content_guidelines', 'platform_specific'
  severity TEXT NOT NULL DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
  criteria JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on compliance_rules
ALTER TABLE public.compliance_rules ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for compliance_rules (readable by all authenticated users)
CREATE POLICY "Users can view compliance rules" 
ON public.compliance_rules 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Insert sample compliance rules
INSERT INTO compliance_rules (name, description, rule_type, severity, criteria) VALUES
('FEC Disclosure Required', 'All political content must include proper FEC disclosure statement', 'fec_disclosure', 'critical', '{"required_text": ["Paid for by", "paid for by"], "min_length": 10}'),
('No Unsubstantiated Claims', 'Content cannot make unverifiable claims about candidates or policies', 'content_guidelines', 'high', '{"prohibited_words": ["always", "never", "best", "worst", "perfect"], "requires_sources": true}'),
('Platform Hashtag Compliance', 'Sponsored content must use appropriate disclosure hashtags per platform', 'platform_specific', 'medium', '{"instagram": ["#ad", "#sponsored", "#paidpartnership"], "twitter": ["#ad", "#sponsored"], "tiktok": ["#ad", "#sponsored"]}'),
('Factual Accuracy Standard', 'All claims must be factually accurate and verifiable', 'content_guidelines', 'high', '{"requires_fact_check": true, "source_required": true}'),
('Respectful Communication', 'Content must maintain respectful tone and avoid inflammatory language', 'content_guidelines', 'medium', '{"tone_check": true, "prohibited_categories": ["hate_speech", "personal_attacks"]}'});

-- Create compliance_reports table for generated reports
CREATE TABLE public.compliance_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_type TEXT NOT NULL, -- 'fec_disclosure', 'campaign_summary', 'quarterly_review'
  campaign_id UUID,
  generated_by UUID NOT NULL,
  report_data JSONB NOT NULL DEFAULT '{}',
  date_range_start DATE,
  date_range_end DATE,
  status TEXT NOT NULL DEFAULT 'generated', -- 'generated', 'reviewed', 'filed'
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on compliance_reports
ALTER TABLE public.compliance_reports ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for compliance_reports
CREATE POLICY "Users can manage reports for their campaigns" 
ON public.compliance_reports 
FOR ALL 
USING (
  generated_by = auth.uid() OR 
  (campaign_id IS NOT NULL AND campaign_id IN (
    SELECT c.id 
    FROM campaigns c
    JOIN pacs p ON c.pac_id = p.id
    WHERE p.admin_user_id = auth.uid()
  ))
);

-- Add sample campaign analytics data
INSERT INTO campaign_analytics (
  campaign_id,
  submission_id,
  platform,
  impressions,
  clicks,
  engagement_count,
  shares,
  comments,
  date_recorded
) 
SELECT 
  cs.campaign_id,
  cs.id,
  cs.platform,
  FLOOR(RANDOM() * 50000 + 1000)::integer, -- Random impressions 1K-50K
  FLOOR(RANDOM() * 2000 + 50)::integer, -- Random clicks 50-2K
  FLOOR(RANDOM() * 1000 + 25)::integer, -- Random engagement 25-1K
  FLOOR(RANDOM() * 200 + 5)::integer, -- Random shares 5-200
  FLOOR(RANDOM() * 150 + 2)::integer, -- Random comments 2-150
  cs.submission_date::date
FROM content_submissions cs
WHERE cs.status = 'approved'
AND cs.submission_date > NOW() - INTERVAL '30 days';

-- Create function to automatically create audit log entries
CREATE OR REPLACE FUNCTION public.create_audit_log_entry(
  p_action TEXT,
  p_target_type TEXT,
  p_target_id UUID,
  p_details JSONB DEFAULT '{}'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  log_id UUID;
  user_profile RECORD;
BEGIN
  -- Get user profile information
  SELECT email INTO user_profile
  FROM auth.users
  WHERE id = auth.uid();
  
  -- Insert audit log entry
  INSERT INTO audit_logs (
    action,
    target_type,
    target_id,
    user_id,
    user_email,
    details
  ) VALUES (
    p_action,
    p_target_type,
    p_target_id,
    auth.uid(),
    user_profile.email,
    p_details
  ) RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$;

-- Create trigger function for content submission status changes
CREATE OR REPLACE FUNCTION public.log_submission_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only log if status actually changed
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    PERFORM create_audit_log_entry(
      CASE 
        WHEN NEW.status = 'approved' THEN 'submission_approved'
        WHEN NEW.status = 'revision_requested' THEN 'revision_requested'
        WHEN NEW.status = 'pending' THEN 'submission_pending'
        ELSE 'status_changed'
      END,
      'content_submission',
      NEW.id,
      jsonb_build_object(
        'old_status', OLD.status,
        'new_status', NEW.status,
        'review_notes', NEW.review_notes,
        'campaign_id', NEW.campaign_id,
        'platform', NEW.platform
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for content submission status changes
CREATE TRIGGER log_content_submission_changes
  AFTER UPDATE ON content_submissions
  FOR EACH ROW
  EXECUTE FUNCTION log_submission_status_change();

-- Update timestamp trigger for new tables
CREATE TRIGGER update_compliance_rules_updated_at
  BEFORE UPDATE ON compliance_rules
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_compliance_reports_updated_at
  BEFORE UPDATE ON compliance_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();