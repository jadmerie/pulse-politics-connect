-- Create unique user profiles for each influencer
-- First, let's create new user IDs and profiles for our influencers

-- Create unique profiles for different influencers
INSERT INTO profiles (id, user_id, display_name, bio, location, political_party, avatar_url) VALUES
(gen_random_uuid(), gen_random_uuid(), 'Sarah Martinez', 'Conservative activist and small business owner from Texas. Fighting for fiscal responsibility and traditional values. #SmallBusiness #ConservativeValues', 'Austin, TX', 'Republican', '/src/assets/avatars/creator1.jpg'),
(gen_random_uuid(), gen_random_uuid(), 'Marcus Johnson', 'Progressive advocate for social justice and climate action. Former community organizer turned digital influencer. Change starts at the grassroots level.', 'Portland, OR', 'Democrat', '/src/assets/avatars/creator2.jpg'),
(gen_random_uuid(), gen_random_uuid(), 'Emily Rodriguez', 'Libertarian voice for individual freedom and limited government. Tech entrepreneur passionate about privacy rights and economic liberty.', 'Miami, FL', 'Libertarian', '/src/assets/avatars/creator3.jpg'),
(gen_random_uuid(), gen_random_uuid(), 'David Kim', 'Independent political commentator and former military officer. Bridging divides through respectful dialogue and evidence-based analysis.', 'Virginia Beach, VA', 'Independent', '/src/assets/avatars/creator4.jpg'),
(gen_random_uuid(), gen_random_uuid(), 'Jessica Thompson', 'Rural Democrat advocating for agricultural communities and working families. Fighting for healthcare access and economic opportunity in rural America.', 'Des Moines, IA', 'Democrat', '/src/assets/avatars/influencer-patriot-1.webp'),
(gen_random_uuid(), gen_random_uuid(), 'Robert Wilson', 'Constitutional conservative and Second Amendment advocate. Former law enforcement officer dedicated to protecting our fundamental rights.', 'Phoenix, AZ', 'Republican', '/src/assets/avatars/presidential-1.webp'),
(gen_random_uuid(), gen_random_uuid(), 'Amanda Foster', 'Green Party environmental activist and sustainability consultant. Working toward a cleaner future for the next generation.', 'Seattle, WA', 'Independent', '/src/assets/avatars/presidential-3.webp'),
(gen_random_uuid(), gen_random_uuid(), 'Carlos Mendez', 'Latino Republican businessman focused on immigration reform and economic growth. Building bridges in our diverse communities.', 'San Antonio, TX', 'Republican', '/src/assets/avatars/pac-emblem-1.webp');

-- Update existing influencers to use these new unique user_ids
WITH new_users AS (
  SELECT user_id, ROW_NUMBER() OVER (ORDER BY user_id) as rn 
  FROM profiles 
  WHERE display_name IN ('Sarah Martinez', 'Marcus Johnson', 'Emily Rodriguez', 'David Kim', 'Jessica Thompson', 'Robert Wilson', 'Amanda Foster', 'Carlos Mendez')
),
existing_influencers AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY id) as rn 
  FROM influencers 
  WHERE verification_status = 'verified'
)
UPDATE influencers 
SET user_id = new_users.user_id
FROM new_users, existing_influencers
WHERE influencers.id = existing_influencers.id 
AND new_users.rn = existing_influencers.rn;

-- Update the old Alex Chen profile to be one of our new diverse profiles
UPDATE profiles 
SET display_name = 'Alex Chen',
    bio = 'Independent political analyst and former journalist. Committed to fact-based reporting and breaking through partisan echo chambers. Democracy depends on informed citizens.',
    location = 'Denver, CO',
    political_party = 'Independent',
    avatar_url = '/src/assets/avatars/presidential-2.webp'
WHERE user_id = 'a9146778-8839-4832-8bf2-17d922fc29a0';