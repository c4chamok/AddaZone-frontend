import type { conversation } from '@/lib/slices/chatSlice';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
// import { formatDistanceToNow } from 'date-fns';
import { useAppSelector } from '@/lib/hooks';

interface ChatListItemProps {
  chat: conversation;
  onClick: () => void;
}

const ChatListItem = ({ chat, onClick }: ChatListItemProps) => {
  const { activeDMId, onlineConvoIds } = useAppSelector(state => state.chat);
  const { user } = useAppSelector(state => state.auth);
  const { theme } = useAppSelector(state => state.ui);
  const isDark = theme === 'dark';
  const isTyping = false; // Placeholder, implement typing logic if needed
  
  const otherUser = chat.participants.find(p => p.userId !== user?.id);
  const isActive = chat.id === activeDMId;
  
  // const formatTime = (date: Date) => {
  //   const now = new Date();
  //   const messageDate = new Date(date);
  //   const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);
    
  //   if (diffInHours < 24) {
  //     return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  //   } else {
  //     return messageDate.toLocaleDateString();
  //   }
  // };

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 animate-fade-in",
        "hover:scale-[1.02] hover:shadow-md",
        isActive
          ? isDark
            ? "bg-purple-900/50 border border-purple-500/30"
            : "bg-purple-50 border border-purple-200"
          : isDark
          ? "hover:bg-gray-700/50"
          : "hover:bg-gray-50"
      )}
    >
      <div className="relative mr-3">
        <Avatar className="h-12 w-12">
          {/* <AvatarImage src={otherUser?.avatar} /> */}
          <AvatarFallback className={cn(
            "text-sm font-medium transition-colors duration-300",
            isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
          )}>
            {otherUser?.user.username.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {onlineConvoIds.includes(chat.id) && (
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full animate-pulse" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className={cn(
            "font-medium truncate transition-colors duration-300",
            isDark ? "text-white" : "text-gray-900"
          )}>
            {otherUser?.user.name || otherUser?.user.username || 'Unknown User'}
          </h3>
          {/* {chat.messages[0] && (
            <span className={cn(
              "text-xs transition-colors duration-300",
              isDark ? "text-gray-400" : "text-gray-500"
            )}>
              {formatTime(chat.messages[0])}
            </span>
          )} */}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {isTyping ? (
              <div className="flex items-center gap-1">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs text-purple-500 font-medium">typing...</span>
              </div>
            ) : chat.messages[0] ? (
              <p className={cn(
                "text-sm truncate transition-colors duration-300",
                // chat.unreadCount > 0 ?
                  isDark ? "text-white font-medium" : "text-gray-900 font-medium"
                  // : isDark ? "text-gray-400" : "text-gray-600"
              )}>
                {chat.messages[chat.messages.length-1].senderId === user?.id ? 'You: ' : ''}
                {chat.messages[chat.messages.length-1].content}
              </p>
            ) : (
              <p className={cn(
                "text-sm italic transition-colors duration-300",
                isDark ? "text-gray-500" : "text-gray-400"
              )}>
                No messages yet
              </p>
            )}
          </div>
          
          {/* {chat.unreadCount > 0 && (
            <Badge className="bg-purple-600 hover:bg-purple-700 text-white text-xs min-w-[20px] h-5 flex items-center justify-center animate-pulse">
              {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
            </Badge>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
