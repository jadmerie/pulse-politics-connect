-- Add foreign key constraints for proper relations
ALTER TABLE messages 
  ADD CONSTRAINT messages_campaign_id_fkey 
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE;

ALTER TABLE messages 
  ADD CONSTRAINT messages_sender_id_fkey 
  FOREIGN KEY (sender_id) REFERENCES profiles(user_id) ON DELETE CASCADE;

ALTER TABLE messages 
  ADD CONSTRAINT messages_recipient_id_fkey 
  FOREIGN KEY (recipient_id) REFERENCES profiles(user_id) ON DELETE CASCADE;

ALTER TABLE conversations 
  ADD CONSTRAINT conversations_campaign_id_fkey 
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE;

ALTER TABLE conversations 
  ADD CONSTRAINT conversations_pac_user_id_fkey 
  FOREIGN KEY (pac_user_id) REFERENCES profiles(user_id) ON DELETE CASCADE;

ALTER TABLE conversations 
  ADD CONSTRAINT conversations_influencer_user_id_fkey 
  FOREIGN KEY (influencer_user_id) REFERENCES profiles(user_id) ON DELETE CASCADE;