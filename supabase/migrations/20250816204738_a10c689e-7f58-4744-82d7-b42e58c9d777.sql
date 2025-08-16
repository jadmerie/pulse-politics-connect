-- Update existing influencer profiles with unique avatars and bios
UPDATE profiles 
SET 
  avatar_url = 'src/assets/avatars/influencer-patriot-1.webp',
  bio = 'Conservative political commentator and grassroots organizer. Passionate about constitutional values, free markets, and defending American traditions. Building bridges through respectful dialogue.',
  political_party = 'republican',
  location = 'Austin, TX'
WHERE user_id = (SELECT user_id FROM influencers WHERE id = '770e8400-e29b-41d4-a716-446655440001');

UPDATE profiles 
SET 
  avatar_url = 'src/assets/avatars/presidential-1.webp',
  bio = 'Progressive activist focused on climate action, social justice, and economic equality. Using social media to amplify marginalized voices and drive meaningful policy change.',
  political_party = 'democrat',
  location = 'Portland, OR'
WHERE user_id = (SELECT user_id FROM influencers WHERE id = '770e8400-e29b-41d4-a716-446655440002');

UPDATE profiles 
SET 
  avatar_url = 'src/assets/avatars/presidential-2.webp',
  bio = 'Independent political analyst and former journalist. Committed to fact-based reporting and breaking through partisan echo chambers. Democracy depends on informed citizens.',
  political_party = 'independent',
  location = 'Denver, CO'
WHERE user_id = (SELECT user_id FROM influencers WHERE id = '770e8400-e29b-41d4-a716-446655440003');

-- Update display names to be more diverse and realistic
UPDATE profiles 
SET display_name = 'Sarah Mitchell'
WHERE user_id = (SELECT user_id FROM influencers WHERE id = '770e8400-e29b-41d4-a716-446655440001');

UPDATE profiles 
SET display_name = 'Marcus Rodriguez'
WHERE user_id = (SELECT user_id FROM influencers WHERE id = '770e8400-e29b-41d4-a716-446655440002');

UPDATE profiles 
SET display_name = 'Alex Chen'
WHERE user_id = (SELECT user_id FROM influencers WHERE id = '770e8400-e29b-41d4-a716-446655440003');