import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
// import { Check, CheckCheck } from 'lucide-react';
import { useAppSelector } from '@/lib/hooks';
import type { Friend, Message } from '@/lib/slices/chatSlice';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar: boolean;
  user: Friend;
}

const MessageBubble = ({ message, isOwn, showAvatar, user }: MessageBubbleProps) => {
    // const { theme } = useAppSelector(state => state.ui);
    // const { theme } = useAppSelector(state => state.ui);
    const { theme } = useAppSelector(state => state.ui);
    const isDark = theme === 'dark';

  // const formatTime = (date: Date) => {
  //   return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  // };

  return (
    <div className={cn(
      "flex gap-2 animate-fade-in",
      isOwn ? "justify-end" : "justify-start"
    )}>
      {!isOwn && showAvatar && (
        <Avatar className="h-8 w-8 mt-1">
          <AvatarImage src={user.avatar} />
          <AvatarFallback className={cn(
            "text-xs transition-colors duration-300",
            isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
          )}>
            {user.username.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      
      {!isOwn && !showAvatar && <div className="w-8" />}

      <div className={cn(
        "max-w-xs lg:max-w-md transition-all duration-200 hover:scale-[1.02]",
        isOwn ? "order-1" : "order-2"
      )}>
        <div
          className={cn(
            "px-4 py-2 rounded-2xl transition-colors duration-300",
            isOwn
              ? "bg-purple-600 text-white rounded-br-md"
              : isDark
              ? "bg-gray-700 text-white rounded-bl-md"
              : "bg-gray-200 text-gray-900 rounded-bl-md"
          )}
        >
          <p className="text-sm break-words">{message.content}</p>
        </div>
        
        <div className={cn(
          "flex items-center gap-1 mt-1 px-2 text-xs transition-colors duration-300",
          isOwn ? "justify-end" : "justify-start",
          isDark ? "text-gray-400" : "text-gray-500"
        )}>
          {/* <span>{formatTime(message.timestamp)}</span> */}
          {isOwn && (
            <div className="flex items-center">
              {/* {message.isRead ? (
                <CheckCheck className="h-3 w-3 text-purple-400" />
              ) : (
                <Check className="h-3 w-3" />
              )} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
