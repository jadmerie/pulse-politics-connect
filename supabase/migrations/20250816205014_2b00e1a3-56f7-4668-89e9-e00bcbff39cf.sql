-- Create messages table for PAC-Influencer communication
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL,
  sender_id UUID NOT NULL,
  recipient_id UUID NOT NULL,
  subject TEXT,
  content TEXT NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create conversation threads table
CREATE TABLE public.conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL,
  pac_user_id UUID NOT NULL,
  influencer_user_id UUID NOT NULL,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(campaign_id, pac_user_id, influencer_user_id)
);

-- Enable RLS on both tables
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

-- RLS policies for messages
CREATE POLICY "Users can view messages they sent or received"
  ON public.messages FOR SELECT
  USING (
    sender_id = auth.uid() OR 
    recipient_id = auth.uid()
  );

CREATE POLICY "Users can send messages to campaign participants"
  ON public.messages FOR INSERT
  WITH CHECK (
    sender_id = auth.uid() AND
    (
      -- PAC admin can message influencers in their campaigns
      (campaign_id IN (
        SELECT c.id FROM campaigns c
        JOIN pacs p ON c.pac_id = p.id
        WHERE p.admin_user_id = auth.uid()
      )) OR
      -- Influencers can message PAC admins for campaigns they're invited to
      (campaign_id IN (
        SELECT ci.campaign_id FROM campaign_invitations ci
        JOIN influencers i ON ci.influencer_id = i.id
        WHERE i.user_id = auth.uid()
      ))
    )
  );

CREATE POLICY "Users can update their own messages"
  ON public.messages FOR UPDATE
  USING (sender_id = auth.uid());

-- RLS policies for conversations
CREATE POLICY "Users can view their conversations"
  ON public.conversations FOR SELECT
  USING (
    pac_user_id = auth.uid() OR 
    influencer_user_id = auth.uid()
  );

CREATE POLICY "Users can create conversations for their campaigns"
  ON public.conversations FOR INSERT
  WITH CHECK (
    pac_user_id = auth.uid() OR 
    influencer_user_id = auth.uid()
  );

CREATE POLICY "Users can update their conversations"
  ON public.conversations FOR UPDATE
  USING (
    pac_user_id = auth.uid() OR 
    influencer_user_id = auth.uid()
  );

-- Create trigger to update conversation last_message_at
CREATE OR REPLACE FUNCTION update_conversation_timestamp()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_conversation_on_message
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_timestamp();

-- Add updated_at trigger for messages
CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add updated_at trigger for conversations
CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();