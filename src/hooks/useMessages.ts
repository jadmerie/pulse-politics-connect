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
        // Fetch conversations
        const { data: convData, error: convError } = await supabase
          .from('conversations')
          .select('*')
          .or(`pac_user_id.eq.${user.id},influencer_user_id.eq.${user.id}`)
          .order('last_message_at', { ascending: false });

        if (convError) {
          console.error('Error fetching conversations:', convError);
          setLoading(false);
          return;
        }

        // Fetch related data
        const conversations = convData || [];
        const enrichedConversations = await Promise.all(
          conversations.map(async (conv) => {
            // Fetch campaign name
            const { data: campaignData } = await supabase
              .from('campaigns')
              .select('name')
              .eq('id', conv.campaign_id)
              .single();

            // Fetch PAC profile
            const { data: pacProfile } = await supabase
              .from('profiles')
              .select('display_name, avatar_url')
              .eq('user_id', conv.pac_user_id)
              .single();

            // Fetch influencer profile
            const { data: influencerProfile } = await supabase
              .from('profiles')
              .select('display_name, avatar_url')
              .eq('user_id', conv.influencer_user_id)
              .single();

            return {
              ...conv,
              campaign: campaignData,
              pac_profile: pacProfile,
              influencer_profile: influencerProfile,
            };
          })
        );

        setConversations(enrichedConversations);
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
        // Fetch messages for the conversation
        const { data: msgData, error } = await supabase
          .from('messages')
          .select('*')
          .eq('campaign_id', conversation.campaign_id)
          .or(`sender_id.eq.${conversation.pac_user_id},recipient_id.eq.${conversation.pac_user_id}`)
          .or(`sender_id.eq.${conversation.influencer_user_id},recipient_id.eq.${conversation.influencer_user_id}`)
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Error fetching messages:', error);
          return;
        }

        // Enrich messages with profile data
        const enrichedMessages = await Promise.all(
          (msgData || []).map(async (msg) => {
            const { data: senderProfile } = await supabase
              .from('profiles')
              .select('display_name, avatar_url')
              .eq('user_id', msg.sender_id)
              .single();

            const { data: recipientProfile } = await supabase
              .from('profiles')
              .select('display_name, avatar_url')
              .eq('user_id', msg.recipient_id)
              .single();

            return {
              ...msg,
              sender_profile: senderProfile,
              recipient_profile: recipientProfile,
            };
          })
        );

        setMessages(enrichedMessages);
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