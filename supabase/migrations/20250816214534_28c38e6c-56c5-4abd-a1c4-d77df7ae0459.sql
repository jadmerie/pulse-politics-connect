-- Add more diverse influencers to populate the discovery page
INSERT INTO influencers (
  id, 
  user_id, 
  platforms, 
  follower_counts, 
  engagement_rates, 
  verification_status, 
  rate_per_post, 
  availability_status
) VALUES 
(
  '770e8400-e29b-41d4-a716-446655440004',
  'a9146778-8839-4832-8bf2-17d922fc29a0',
  '{"instagram": "davidkim_indie", "twitter": "davidkim_va", "youtube": "IndependentVoicesVA"}',
  '{"instagram": 28000, "twitter": 15000, "youtube": 8500}',
  '{"instagram": 5.2, "twitter": 3.7, "youtube": 7.1}',
  'verified',
  350,
  'available'
),
(
  '770e8400-e29b-41d4-a716-446655440005',
  'a9146778-8839-4832-8bf2-17d922fc29a0',
  '{"instagram": "jessica_rural_dem", "twitter": "jessicathompson_ia", "facebook": "JessicaForRuralIA"}',
  '{"instagram": 18000, "twitter": 12000, "facebook": 22000}',
  '{"instagram": 6.3, "twitter": 4.1, "facebook": 5.8}',
  'verified',
  280,
  'available'
),
(
  '770e8400-e29b-41d4-a716-446655440006',
  'a9146778-8839-4832-8bf2-17d922fc29a0',
  '{"instagram": "robert_2a_az", "twitter": "robertwilson_2a", "youtube": "ConstitutionalRights2A"}',
  '{"instagram": 42000, "twitter": 38000, "youtube": 15000}',
  '{"instagram": 7.2, "twitter": 5.4, "youtube": 8.9}',
  'verified',
  500,
  'available'
),
(
  '770e8400-e29b-41d4-a716-446655440007',
  'a9146778-8839-4832-8bf2-17d922fc29a0',
  '{"instagram": "amanda_green_sea", "twitter": "amandafoster_green", "tiktok": "greenfutureseattle"}',
  '{"instagram": 31000, "twitter": 25000, "tiktok": 48000}',
  '{"instagram": 6.8, "twitter": 4.5, "tiktok": 9.2}',
  'verified',
  420,
  'available'
),
(
  '770e8400-e29b-41d4-a716-446655440008',
  'a9146778-8839-4832-8bf2-17d922fc29a0',
  '{"instagram": "carlos_latino_gop", "twitter": "carlosmendez_tx", "facebook": "CarlosForTexas"}',
  '{"instagram": 25000, "twitter": 20000, "facebook": 18000}',
  '{"instagram": 5.9, "twitter": 4.2, "facebook": 6.1}',
  'verified',
  380,
  'available'
);