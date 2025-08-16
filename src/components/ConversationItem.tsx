import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import type { Conversation } from '@/hooks/useMessages';

interface ConversationItemProps {
  conversation: Conversation;
  otherUser: {
    name: string;
    avatar: string | null;
  };
  isSelected: boolean;
  onClick: () => void;
}

const ConversationItem = ({ conversation, otherUser, isSelected, onClick }: ConversationItemProps) => {
  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
        isSelected 
          ? 'bg-primary/10 border border-primary/20' 
          : 'hover:bg-muted/50'
      }`}
    >
      <div className="flex items-start gap-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={otherUser.avatar || ''} />
          <AvatarFallback className="text-sm">
            {otherUser.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium truncate text-sm">
              {otherUser.name}
            </h4>
            {conversation.unread_count && conversation.unread_count > 0 && (
              <Badge variant="destructive" className="text-xs px-2 py-0">
                {conversation.unread_count}
              </Badge>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mb-1 truncate">
            {conversation.campaign?.name}
          </p>
          
          <p className="text-xs text-muted-foreground">
            {conversation.last_message_at 
              ? formatTime(conversation.last_message_at)
              : formatTime(conversation.created_at)
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;