import { useState, useEffect } from 'react';
import { useMessages } from '@/hooks/useMessages';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Send } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import ConversationItem from '@/components/ConversationItem';
import MessageBubble from '@/components/MessageBubble';
import SEO from '@/components/SEO';

const Messages = () => {
  const { user } = useAuth();
  const { 
    conversations, 
    messages, 
    selectedConversation, 
    setSelectedConversation, 
    loading, 
    sendMessage, 
    markAsRead 
  } = useMessages();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);

  // Real-time subscriptions
  useEffect(() => {
    if (!user) return;

    const messageChannel = supabase
      .channel('messages-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          // Refresh conversations when new message is received
          window.location.reload();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageChannel);
    };
  }, [user]);

  // Filter conversations based on search
  const filteredConversations = conversations.filter(conv => {
    const otherUser = conv.pac_user_id === user?.id 
      ? conv.influencer_profile?.display_name || 'Unknown'
      : conv.pac_profile?.display_name || 'Unknown';
    
    const campaignName = conv.campaign?.name || '';
    
    return otherUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
           campaignName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConv || !user) return;

    const recipientId = selectedConv.pac_user_id === user.id 
      ? selectedConv.influencer_user_id 
      : selectedConv.pac_user_id;

    setSending(true);
    const { error } = await sendMessage(recipientId, selectedConv.campaign_id, newMessage);
    
    if (error) {
      toast.error('Failed to send message');
    } else {
      toast.success('Message sent successfully!');
      setNewMessage('');
    }
    setSending(false);
  };

  const getOtherUserInfo = (conv: any) => {
    if (!user) return { name: 'Unknown', avatar: null };
    
    return conv.pac_user_id === user.id 
      ? {
          name: conv.influencer_profile?.display_name || 'Unknown Influencer',
          avatar: conv.influencer_profile?.avatar_url
        }
      : {
          name: conv.pac_profile?.display_name || 'Unknown PAC Admin',
          avatar: conv.pac_profile?.avatar_url
        };
  };

  if (loading && conversations.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <SEO 
          title="Messages - PoliPulse"
          description="Manage your campaign conversations and communications"
          canonicalPath="/messages"
        />
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading messages...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <SEO 
        title="Messages - PoliPulse"
        description="Manage your campaign conversations and communications"
        canonicalPath="/messages"
      />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
          <p className="text-muted-foreground">Manage your campaign conversations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
          {/* Conversations Sidebar */}
          <div className="lg:col-span-1 border rounded-lg flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <ScrollArea className="flex-1">
              {filteredConversations.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  {conversations.length === 0 ? 'No conversations yet' : 'No conversations match your search'}
                </div>
              ) : (
                <div className="p-2">
                  {filteredConversations.map((conv) => (
                    <ConversationItem
                      key={conv.id}
                      conversation={conv}
                      otherUser={getOtherUserInfo(conv)}
                      isSelected={selectedConversation === conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 border rounded-lg flex flex-col">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={getOtherUserInfo(selectedConv).avatar || ''} />
                      <AvatarFallback>
                        {getOtherUserInfo(selectedConv).name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{getOtherUserInfo(selectedConv).name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Campaign: {selectedConv.campaign?.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      <p>No messages yet. Start the conversation!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <MessageBubble
                          key={message.id}
                          message={message}
                          isOwn={message.sender_id === user?.id}
                          onMarkAsRead={() => markAsRead(message.id)}
                        />
                      ))}
                    </div>
                  )}
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[60px] resize-none"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || sending}
                      size="sm"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center">
                <div>
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">
                    Choose a conversation from the sidebar to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;