-- Create avatars storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars', 
  'avatars', 
  true, 
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
);

-- Create RLS policies for avatars bucket
CREATE POLICY "Avatar images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own avatar" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own avatar" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Update existing profiles with unique avatar URLs using a diverse set of profile images
UPDATE profiles 
SET avatar_url = CASE 
  WHEN id = (SELECT id FROM profiles WHERE avatar_url IS NULL OR avatar_url = '' ORDER BY created_at LIMIT 1 OFFSET 0) 
    THEN '/src/assets/avatars/influencer-patriot-1.webp'
  WHEN id = (SELECT id FROM profiles WHERE avatar_url IS NULL OR avatar_url = '' ORDER BY created_at LIMIT 1 OFFSET 1) 
    THEN '/src/assets/avatars/presidential-1.webp'
  WHEN id = (SELECT id FROM profiles WHERE avatar_url IS NULL OR avatar_url = '' ORDER BY created_at LIMIT 1 OFFSET 2) 
    THEN '/src/assets/avatars/presidential-2.webp'
  WHEN id = (SELECT id FROM profiles WHERE avatar_url IS NULL OR avatar_url = '' ORDER BY created_at LIMIT 1 OFFSET 3) 
    THEN '/src/assets/avatars/presidential-3.webp'
  WHEN id = (SELECT id FROM profiles WHERE avatar_url IS NULL OR avatar_url = '' ORDER BY created_at LIMIT 1 OFFSET 4) 
    THEN '/src/assets/avatars/pac-emblem-1.webp'
  WHEN id = (SELECT id FROM profiles WHERE avatar_url IS NULL OR avatar_url = '' ORDER BY created_at LIMIT 1 OFFSET 5) 
    THEN '/src/assets/avatars/creator1.jpg'
  WHEN id = (SELECT id FROM profiles WHERE avatar_url IS NULL OR avatar_url = '' ORDER BY created_at LIMIT 1 OFFSET 6) 
    THEN '/src/assets/avatars/creator2.jpg'
  WHEN id = (SELECT id FROM profiles WHERE avatar_url IS NULL OR avatar_url = '' ORDER BY created_at LIMIT 1 OFFSET 7) 
    THEN '/src/assets/avatars/creator3.jpg'
  WHEN id = (SELECT id FROM profiles WHERE avatar_url IS NULL OR avatar_url = '' ORDER BY created_at LIMIT 1 OFFSET 8) 
    THEN '/src/assets/avatars/creator4.jpg'
  ELSE avatar_url
END
WHERE avatar_url IS NULL OR avatar_url = '';