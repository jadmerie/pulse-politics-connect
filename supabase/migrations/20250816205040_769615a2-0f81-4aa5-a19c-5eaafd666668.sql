-- Fix function search path security issue
CREATE OR REPLACE FUNCTION update_conversation_timestamp()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE conversations 
  SET 
    last_message_at = NEW.created_at,
    updated_at = now()
  WHERE 
    campaign_id = NEW.campaign_id AND
    ((pac_user_id = NEW.sender_id AND influencer_user_id = NEW.recipient_id) OR
     (pac_user_id = NEW.recipient_id AND influencer_user_id = NEW.sender_id));
  
  RETURN NEW;
END;
$$;