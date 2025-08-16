-- Fix avatar URLs to use correct asset paths
UPDATE profiles 
SET avatar_url = CASE 
  WHEN avatar_url = '/src/assets/avatars/influencer-patriot-1.webp' THEN '/src/assets/avatars/influencer-patriot-1.webp'
  WHEN avatar_url = '/src/assets/avatars/presidential-1.webp' THEN '/src/assets/avatars/presidential-1.webp'
  WHEN avatar_url = '/src/assets/avatars/presidential-2.webp' THEN '/src/assets/avatars/presidential-2.webp'
  WHEN avatar_url = '/src/assets/avatars/presidential-3.webp' THEN '/src/assets/avatars/presidential-3.webp'
  WHEN avatar_url = '/src/assets/avatars/pac-emblem-1.webp' THEN '/src/assets/avatars/pac-emblem-1.webp'
  WHEN avatar_url = '/src/assets/avatars/creator1.jpg' THEN '/src/assets/avatars/creator1.jpg'
  WHEN avatar_url = '/src/assets/avatars/creator2.jpg' THEN '/src/assets/avatars/creator2.jpg'
  WHEN avatar_url = '/src/assets/avatars/creator3.jpg' THEN '/src/assets/avatars/creator3.jpg'
  WHEN avatar_url = '/src/assets/avatars/creator4.jpg' THEN '/src/assets/avatars/creator4.jpg'
  WHEN avatar_url = 'src/assets/avatars/influencer-patriot-1.webp' THEN '/src/assets/avatars/influencer-patriot-1.webp'
  WHEN avatar_url = 'src/assets/avatars/presidential-1.webp' THEN '/src/assets/avatars/presidential-1.webp'
  WHEN avatar_url = 'src/assets/avatars/presidential-2.webp' THEN '/src/assets/avatars/presidential-2.webp'
  WHEN avatar_url = 'src/assets/avatars/presidential-3.webp' THEN '/src/assets/avatars/presidential-3.webp'
  WHEN avatar_url = 'src/assets/avatars/pac-emblem-1.webp' THEN '/src/assets/avatars/pac-emblem-1.webp'
  WHEN avatar_url = 'src/assets/avatars/creator1.jpg' THEN '/src/assets/avatars/creator1.jpg'
  WHEN avatar_url = 'src/assets/avatars/creator2.jpg' THEN '/src/assets/avatars/creator2.jpg'
  WHEN avatar_url = 'src/assets/avatars/creator3.jpg' THEN '/src/assets/avatars/creator3.jpg'
  WHEN avatar_url = 'src/assets/avatars/creator4.jpg' THEN '/src/assets/avatars/creator4.jpg'
  ELSE avatar_url
END
WHERE avatar_url LIKE '%assets/avatars/%';