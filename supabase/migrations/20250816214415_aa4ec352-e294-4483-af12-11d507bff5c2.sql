-- Create diverse sample influencer profiles by updating existing profile and adding new sample data
-- First, let's update the existing Alex Chen profile with different data each time

-- Update the current profile to be Sarah Martinez
UPDATE profiles 
SET display_name = 'Sarah Martinez',
    bio = 'Conservative activist and small business owner from Texas. Fighting for fiscal responsibility and traditional values. Building a stronger America through entrepreneurship.',
    location = 'Austin, TX',
    political_party = 'Republican',
    avatar_url = '/src/assets/avatars/creator1.jpg'
WHERE user_id = 'a9146778-8839-4832-8bf2-17d922fc29a0';

-- Create additional sample profiles (these will represent different influencers even if they share the user account)
-- We'll update the influencer records to have different follower counts and engagement rates to make them appear unique

-- Update the first influencer record
UPDATE influencers 
SET follower_counts = '{"instagram": 15000, "twitter": 8000, "tiktok": 25000}',
    engagement_rates = '{"instagram": 4.2, "twitter": 2.8, "tiktok": 6.1}',
    platforms = '{"instagram": "sarah_conservative_tx", "twitter": "sarahmatinez_tx", "tiktok": "conservativesarah"}',
    rate_per_post = 250
WHERE id = '770e8400-e29b-41d4-a716-446655440001';

-- Update the second influencer to appear as Marcus Johnson
UPDATE influencers 
SET follower_counts = '{"instagram": 22000, "twitter": 18000, "youtube": 12000}',
    engagement_rates = '{"instagram": 5.7, "twitter": 3.4, "youtube": 8.2}',
    platforms = '{"instagram": "marcusj_progress", "twitter": "marcusjohnson_pdx", "youtube": "ProgressiveVoicesPDX"}',
    rate_per_post = 400
WHERE id = '770e8400-e29b-41d4-a716-446655440002';

-- Update the third influencer to appear as Emily Rodriguez  
UPDATE influencers 
SET follower_counts = '{"instagram": 35000, "twitter": 28000, "tiktok": 45000}',
    engagement_rates = '{"instagram": 6.8, "twitter": 4.1, "tiktok": 7.9}',
    platforms = '{"instagram": "emily_liberty_fl", "twitter": "emilyrodriguez_lib", "tiktok": "libertarianemily"}',
    rate_per_post = 600
WHERE id = '770e8400-e29b-41d4-a716-446655440003';

-- Create a function to get random profile data for display
CREATE OR REPLACE FUNCTION get_diverse_profile_data(influencer_uuid uuid) 
RETURNS jsonb AS $$
DECLARE
  profiles_data jsonb[] := ARRAY[
    '{"display_name": "Sarah Martinez", "bio": "Conservative activist and small business owner from Texas. Fighting for fiscal responsibility and traditional values. Building a stronger America through entrepreneurship.", "location": "Austin, TX", "political_party": "Republican", "avatar_url": "/src/assets/avatars/creator1.jpg"}',
    '{"display_name": "Marcus Johnson", "bio": "Progressive advocate for social justice and climate action. Former community organizer turned digital influencer. Change starts at the grassroots level.", "location": "Portland, OR", "political_party": "Democrat", "avatar_url": "/src/assets/avatars/creator2.jpg"}',
    '{"display_name": "Emily Rodriguez", "bio": "Libertarian voice for individual freedom and limited government. Tech entrepreneur passionate about privacy rights and economic liberty.", "location": "Miami, FL", "political_party": "Libertarian", "avatar_url": "/src/assets/avatars/creator3.jpg"}',
    '{"display_name": "David Kim", "bio": "Independent political commentator and former military officer. Bridging divides through respectful dialogue and evidence-based analysis.", "location": "Virginia Beach, VA", "political_party": "Independent", "avatar_url": "/src/assets/avatars/creator4.jpg"}',
    '{"display_name": "Jessica Thompson", "bio": "Rural Democrat advocating for agricultural communities and working families. Fighting for healthcare access and economic opportunity in rural America.", "location": "Des Moines, IA", "political_party": "Democrat", "avatar_url": "/src/assets/avatars/influencer-patriot-1.webp"}',
    '{"display_name": "Robert Wilson", "bio": "Constitutional conservative and Second Amendment advocate. Former law enforcement officer dedicated to protecting our fundamental rights.", "location": "Phoenix, AZ", "political_party": "Republican", "avatar_url": "/src/assets/avatars/presidential-1.webp"}',
    '{"display_name": "Amanda Foster", "bio": "Green Party environmental activist and sustainability consultant. Working toward a cleaner future for the next generation.", "location": "Seattle, WA", "political_party": "Independent", "avatar_url": "/src/assets/avatars/presidential-3.webp"}',
    '{"display_name": "Carlos Mendez", "bio": "Latino Republican businessman focused on immigration reform and economic growth. Building bridges in our diverse communities.", "location": "San Antonio, TX", "political_party": "Republican", "avatar_url": "/src/assets/avatars/pac-emblem-1.webp"}'
  ];
  profile_index int;
BEGIN
  -- Use the influencer UUID to consistently select a profile
  profile_index := (abs(hashtext(influencer_uuid::text)) % array_length(profiles_data, 1)) + 1;
  RETURN profiles_data[profile_index];
END;
$$ LANGUAGE plpgsql;