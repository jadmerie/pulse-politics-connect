import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Message {
  id: string;
  campaign_id: string;
  sender_id: string;
  recipient_id: string;
  subject?: string;
  content: string;
  read_at?: string;
  created_at: string;
  updated_at: string;
  sender_profile?: {
    display_name: string | null;
    avatar_url: string | null;
  };
  recipient_profile?: {
    display_name: string | null;
    avatar_url: string | null;
  };
}

export interface Conversation {
  id: string;
  campaign_id: string;
  pac_user_id: string;
  influencer_user_id: string;
  last_message_at?: string;
  created_at: string;
  updated_at: string;
  campaign?: {
    name: string;
  };
  pac_profile?: {
    display_name: string | null;
    avatar_url: string | null;
  };
  influencer_profile?: {
    display_name: string | null;
    avatar_url: string | null;
  };
  unread_count?: number;
}

export const useMessages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  // Fetch conversations for current user
  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) {
        setConversations([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('conversations')
          .select(`
            *,
            campaigns!inner(name),
            pac_profile:profiles!conversations_pac_user_id_fkey(display_name, avatar_url),
            influencer_profile:profiles!conversations_influencer_user_id_fkey(display_name, avatar_url)
          `)
          .or(`pac_user_id.eq.${user.id},influencer_user_id.eq.${user.id}`)
          .order('last_message_at', { ascending: false });

        if (error) {
          console.error('Error fetching conversations:', error);
        } else {
          setConversations(data || []);
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [user]);

  // Fetch messages for selected conversation
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation || !user) {
        setMessages([]);
        return;
      }

      const conversation = conversations.find(c => c.id === selectedConversation);
      if (!conversation) return;

      try {
        const { data, error } = await supabase
          .from('messages')
          .select(`
            *,
            sender_profile:profiles!messages_sender_id_fkey(display_name, avatar_url),
            recipient_profile:profiles!messages_recipient_id_fkey(display_name, avatar_url)
          `)
          .eq('campaign_id', conversation.campaign_id)
          .or(`sender_id.eq.${conversation.pac_user_id},recipient_id.eq.${conversation.pac_user_id}`)
          .or(`sender_id.eq.${conversation.influencer_user_id},recipient_id.eq.${conversation.influencer_user_id}`)
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Error fetching messages:', error);
        } else {
          setMessages(data || []);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [selectedConversation, conversations, user]);

  const sendMessage = async (recipientId: string, campaignId: string, content: string, subject?: string) => {
    if (!user) return { error: new Error('No user') };

    try {
      // Create or get conversation
      const { data: existingConversation } = await supabase
        .from('conversations')
        .select('id')
        .eq('campaign_id', campaignId)
        .or(`pac_user_id.eq.${user.id},influencer_user_id.eq.${user.id}`)
        .or(`pac_user_id.eq.${recipientId},influencer_user_id.eq.${recipientId}`)
        .maybeSingle();

      if (!existingConversation) {
        const { error: convError } = await supabase
          .from('conversations')
          .insert([{
            campaign_id: campaignId,
            pac_user_id: user.id,
            influencer_user_id: recipientId
          }]);

        if (convError) {
          console.error('Error creating conversation:', convError);
        }
      }

      // Send message
      const { data, error } = await supabase
        .from('messages')
        .insert([{
          campaign_id: campaignId,
          sender_id: user.id,
          recipient_id: recipientId,
          content,
          subject
        }])
        .select()
        .single();

      if (error) {
        return { error };
      }

      return { data, error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const markAsRead = async (messageId: string) => {
    if (!user) return { error: new Error('No user') };

    try {
      const { error } = await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .eq('id', messageId)
        .eq('recipient_id', user.id);

      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  return {
    conversations,
    messages,
    selectedConversation,
    setSelectedConversation,
    loading,
    sendMessage,
    markAsRead,
  };
};