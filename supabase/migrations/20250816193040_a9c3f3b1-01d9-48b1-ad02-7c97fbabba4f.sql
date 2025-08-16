-- Insert sample data with correct constraint values

-- Insert sample PACs
INSERT INTO public.pacs (id, name, description, fec_id, admin_user_id, campaign_budget, status) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Progressive Action Fund', 'Advancing progressive policies through digital engagement', 'C00123456', (SELECT id FROM auth.users LIMIT 1), 500000, 'active'),
('550e8400-e29b-41d4-a716-446655440002', 'Conservative Voice PAC', 'Promoting conservative values and fiscal responsibility', 'C00789012', (SELECT id FROM auth.users LIMIT 1), 750000, 'active'),
('550e8400-e29b-41d4-a716-446655440003', 'Youth Engagement Initiative', 'Mobilizing young voters for democratic participation', 'C00345678', (SELECT id FROM auth.users LIMIT 1), 300000, 'active');

-- Insert sample campaigns
INSERT INTO public.campaigns (id, pac_id, name, description, budget, status, start_date, end_date, target_demographics, compliance_notes) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Healthcare for All Campaign', 'Promoting universal healthcare through social media outreach', 150000, 'active', '2024-01-01', '2024-06-30', '{"age_range": "25-54", "states": ["CA", "NY", "TX"], "interests": ["healthcare", "politics"]}', 'FEC disclosure required on all content'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Tax Reform Initiative', 'Educating voters on proposed tax reforms', 200000, 'active', '2024-02-01', '2024-08-31', '{"age_range": "35-65", "income": "middle-high", "states": ["FL", "OH", "PA"]}', 'Must include Paid for by Conservative Voice PAC'),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Get Out The Vote 2024', 'Youth voter mobilization campaign', 100000, 'draft', '2024-08-01', '2024-11-05', '{"age_range": "18-29", "platforms": ["tiktok", "instagram"], "education": "college"}', 'Special attention to youth engagement compliance');

-- Insert sample influencers
INSERT INTO public.influencers (id, user_id, platforms, follower_counts, engagement_rates, political_affiliations, content_categories, verification_status, rate_per_post, availability_status) VALUES
('770e8400-e29b-41d4-a716-446655440001', (SELECT id FROM auth.users LIMIT 1), '{"instagram": "@politicalvoice", "tiktok": "@progressivepov", "twitter": "@polvoice2024"}', '{"instagram": 125000, "tiktok": 89000, "twitter": 45000}', '{"instagram": 4.2, "tiktok": 6.8, "twitter": 3.1}', '{"progressive", "democrat"}', '{"politics", "social_justice", "healthcare"}', 'verified', 2500, 'available'),
('770e8400-e29b-41d4-a716-446655440002', (SELECT id FROM auth.users LIMIT 1), '{"youtube": "ConservativeCommentary", "instagram": "@rightwingview", "facebook": "ConservativeVoice"}', '{"youtube": 250000, "instagram": 180000, "facebook": 95000}', '{"youtube": 5.5, "instagram": 3.8, "facebook": 2.9}', '{"conservative", "republican"}', '{"politics", "economics", "tradition"}', 'verified', 3000, 'available'),
('770e8400-e29b-41d4-a716-446655440003', (SELECT id FROM auth.users LIMIT 1), '{"tiktok": "@genzpolitics", "instagram": "@youthvote", "snapchat": "@votenow2024"}', '{"tiktok": 340000, "instagram": 95000, "snapchat": 75000}', '{"tiktok": 8.2, "instagram": 5.1, "snapchat": 6.3}', '{"independent", "progressive"}', '{"youth_issues", "voting", "education"}', 'verified', 1800, 'available');

-- Insert sample campaign invitations
INSERT INTO public.campaign_invitations (id, campaign_id, influencer_id, offered_amount, status, message, terms) VALUES
('880e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 5000, 'accepted', 'We would love to partner with you on our healthcare campaign', '3 posts over 2 weeks, must include FEC disclosure'),
('880e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', 7500, 'pending', 'Your content aligns perfectly with our tax reform message', '2 Instagram posts and 1 YouTube video'),
('880e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003', 3600, 'accepted', 'Help us mobilize young voters!', '2 TikTok videos with voter registration links');

-- Insert sample content submissions
INSERT INTO public.content_submissions (id, campaign_id, influencer_id, platform, content_type, content_url, caption, fec_disclosure, status, compliance_checked, review_notes) VALUES
('990e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 'instagram', 'post', 'https://instagram.com/p/sample1', 'Healthcare is a human right! #HealthcareForAll', 'Paid for by Progressive Action Fund (C00123456)', 'approved', true, 'Great content, FEC disclosure properly included'),
('990e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', 'youtube', 'video', 'https://youtube.com/watch?v=sample2', 'Understanding the new tax proposal - what it means for you', 'Paid for by Conservative Voice PAC (C00789012)', 'pending', false, 'Needs minor revision to disclosure placement'),
('990e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003', 'tiktok', 'video', 'https://tiktok.com/@sample/video/123', 'Your vote matters! Register today 🗳️ #Vote2024', 'Paid for by Youth Engagement Initiative (C00345678)', 'approved', true, 'Perfect for youth engagement');

-- Insert sample analytics data
INSERT INTO public.campaign_analytics (campaign_id, submission_id, platform, impressions, clicks, engagement_count, shares, comments, date_recorded) VALUES
('660e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', 'instagram', 45000, 2800, 1850, 420, 180, '2024-03-15'),
('660e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', 'instagram', 52000, 3200, 2100, 510, 220, '2024-03-16'),
('660e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440002', 'youtube', 125000, 8500, 4200, 890, 340, '2024-03-15'),
('660e8400-e29b-41d4-a716-446655440003', '990e8400-e29b-41d4-a716-446655440003', 'tiktok', 280000, 15000, 18500, 3400, 1200, '2024-03-15');

-- Insert sample payments (using correct payment_type values)
INSERT INTO public.payments (id, campaign_id, influencer_id, amount, payment_type, status, transaction_id, payment_method, notes) VALUES
('aa0e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 5000, 'influencer_payment', 'completed', 'TXN_HC_001', 'bank_transfer', 'Payment for healthcare campaign posts'),
('aa0e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', 7500, 'influencer_payment', 'pending', 'TXN_TR_002', 'bank_transfer', 'Payment pending content approval'),
('aa0e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003', 3600, 'influencer_payment', 'completed', 'TXN_YV_003', 'paypal', 'Youth vote campaign payment');