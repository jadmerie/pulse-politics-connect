import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send } from 'lucide-react';
import { useMessages } from '@/hooks/useMessages';
import { toast } from 'sonner';

interface MessagingModalProps {
  campaignId: string;
  campaignName: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
}

const MessagingModal = ({ 
  campaignId, 
  campaignName, 
  recipientId, 
  recipientName, 
  recipientAvatar 
}: MessagingModalProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const { sendMessage, conversations, messages, selectedConversation, setSelectedConversation } = useMessages();
  const [sending, setSending] = useState(false);

  // Find existing conversation for this campaign and recipient
  const existingConversation = conversations.find(conv => 
    conv.campaign_id === campaignId && 
    (conv.pac_user_id === recipientId || conv.influencer_user_id === recipientId)
  );

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setSending(true);
    const { error } = await sendMessage(recipientId, campaignId, message, subject || undefined);
    
    if (error) {
      toast.error('Failed to send message');
    } else {
      toast.success('Message sent successfully!');
      setMessage('');
      setSubject('');
      if (existingConversation) {
        setSelectedConversation(existingConversation.id);
      }
    }
    setSending(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MessageCircle className="w-4 h-4 mr-2" />
          Message
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Message for {campaignName}</DialogTitle>
          <DialogDescription>
            Communicate with {recipientName} about this campaign
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
          {/* Message History */}
          <div className="flex flex-col">
            <h3 className="font-semibold mb-2">Conversation History</h3>
            <ScrollArea className="flex-1 border rounded-lg p-4">
              {existingConversation && selectedConversation === existingConversation.id ? (
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No messages yet. Start the conversation!</p>
                  ) : (
                    messages.map((msg) => (
                      <div key={msg.id} className="flex gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={msg.sender_profile?.avatar_url || ''} />
                          <AvatarFallback>
                            {msg.sender_profile?.display_name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-muted rounded-lg p-3">
                            {msg.subject && (
                              <p className="font-semibold text-sm mb-1">{msg.subject}</p>
                            )}
                            <p className="text-sm">{msg.content}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(msg.created_at)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  {existingConversation ? 'Loading conversation...' : 'No conversation started yet.'}
                </p>
              )}
            </ScrollArea>
          </div>

          {/* New Message */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={recipientAvatar} />
                <AvatarFallback>{recipientName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">Send message to {recipientName}</h3>
                <p className="text-sm text-muted-foreground">Campaign: {campaignName}</p>
              </div>
            </div>
            
            <div className="space-y-4 flex-1">
              <div>
                <Label htmlFor="subject">Subject (optional)</Label>
                <Input
                  id="subject"
                  placeholder="Message subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              
              <div className="flex-1 flex flex-col">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 min-h-[200px] resize-none"
                />
              </div>
              
              <Button 
                onClick={handleSendMessage} 
                disabled={!message.trim() || sending}
                className="w-full"
              >
                <Send className="w-4 h-4 mr-2" />
                {sending ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessagingModal;