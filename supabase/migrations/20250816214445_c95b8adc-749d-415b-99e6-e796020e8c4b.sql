-- Fix the function security issue by setting search_path
CREATE OR REPLACE FUNCTION get_diverse_profile_data(influencer_uuid uuid) 
RETURNS jsonb 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
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
$$;