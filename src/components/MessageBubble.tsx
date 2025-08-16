import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import type { Message } from '@/hooks/useMessages';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  onMarkAsRead: () => void;
}

const MessageBubble = ({ message, isOwn, onMarkAsRead }: MessageBubbleProps) => {
  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };

  // Mark as read when message is displayed (if not own message and not already read)
  if (!isOwn && !message.read_at) {
    setTimeout(onMarkAsRead, 1000);
  }

  return (
    <div className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarImage src={message.sender_profile?.avatar_url || ''} />
        <AvatarFallback className="text-xs">
          {message.sender_profile?.display_name?.charAt(0) || 'U'}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex flex-col max-w-[70%] ${isOwn ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-lg p-3 ${
            isOwn
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted'
          }`}
        >
          {message.subject && (
            <p className={`font-semibold text-sm mb-1 ${
              isOwn ? 'text-primary-foreground/90' : 'text-foreground'
            }`}>
              {message.subject}
            </p>
          )}
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>
        
        <div className="flex items-center gap-2 mt-1">
          <p className="text-xs text-muted-foreground">
            {formatTime(message.created_at)}
          </p>
          {!isOwn && !message.read_at && (
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;