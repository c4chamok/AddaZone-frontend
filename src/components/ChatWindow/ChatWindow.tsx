
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Phone,
  Video,
  Info,
  Smile,
  Paperclip,
  Send,
  ThumbsUp,
  // MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import MessageBubble from './MessageBubble';
// import TypingIndicator from './TypingIndicator';
import { useAppSelector } from '@/lib/hooks';
import { addMessage } from '@/lib/slices/chatSlice';

const ChatWindow = () => {
  const dispatch = useDispatch();
  const { conversations, activeDMId } = useAppSelector(state => state.chat);
  const { user } = useAppSelector(state => state.auth);
  // const { isDark } = useSelector((state: RootState) => state.theme);
  const { theme } = useAppSelector(state => state.ui);
  const isDark = theme === 'dark';
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>(null);

  const currentChat = conversations.find(c => c.id === activeDMId);
  const otherUser = currentChat?.participants.find(p => p.id !== user?.id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  if (!user) return null;

  const handleSendMessage = () => {
    if (!message.trim() || !activeDMId) return;

    dispatch(addMessage({
      chatId: activeDMId,
      senderId: user?.id,
      content: message.trim(),
      // timestamp: new Date(),
      // isRead: false,
      // type: 'text'

    }));

    setMessage('');
    handleStopTyping();
  };

  const handleTyping = (value: string) => {
    setMessage(value);

    if (!isTyping && value.trim()) {
      setIsTyping(true);
      // dispatch(setTyping({
      //   chatId: activeDMId,
      //   userId: user?.id,
      //   isTyping: true
      // }));
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      handleStopTyping();
    }, 2000);
  };

  const handleStopTyping = () => {
    if (isTyping) {
      setIsTyping(false);
      // dispatch(setTyping({
      //   chatId: activeDMId,
      //   userId: user?.id,
      //   isTyping: false
      // }));
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!currentChat || !otherUser) {
    return (
      <div className={cn(
        "flex-1 flex items-center justify-center transition-colors duration-300",
        isDark ? "bg-gray-800" : "bg-gray-50"
      )}>
        <div className="text-center">
          <div className={cn(
            "text-4xl mb-4 transition-colors duration-300",
            isDark ? "text-gray-600" : "text-gray-400"
          )}>
            💬
          </div>
          <h2 className={cn(
            "text-xl font-semibold mb-2 transition-colors duration-300",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>
            Select a chat to start messaging
          </h2>
          <p className={cn(
            "transition-colors duration-300",
            isDark ? "text-gray-500" : "text-gray-400"
          )}>
            Choose from your existing conversations or start a new one
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex-1 h-full flex flex-col transition-colors duration-300",
      isDark ? "bg-gray-800" : "bg-gray-50"
    )}>
      {/* Chat Header */}
      <div className={cn(
        "flex items-center justify-between p-4 border-b transition-colors duration-300",
        isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      )}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={otherUser.user.avatar} />
              <AvatarFallback className={cn(
                "text-sm font-medium transition-colors duration-300",
                isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
              )}>
                {otherUser.user.username.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {/* {otherUser.isOnline && ( */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
            {/* )} */}
          </div>
          <div>
            <h2 className={cn(
              "font-semibold transition-colors duration-300",
              isDark ? "text-white" : "text-gray-900"
            )}>
              {otherUser.user.username || otherUser.user.name || 'Unknown User'}
            </h2>
            <p className={cn(
              "text-sm transition-colors duration-300",
              isDark ? "text-gray-400" : "text-gray-500"
            )}>
              {/* {otherUser.isOnline ? 'Active now' : `Last seen ${otherUser.lastSeen ? new Date(otherUser.lastSeen).toLocaleTimeString() : 'recently'}`} */}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "transition-colors duration-300",
              isDark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"
            )}
          >
            <Phone className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "transition-colors duration-300",
              isDark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"
            )}
          >
            <Video className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "transition-colors duration-300",
              isDark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"
            )}
          >
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {currentChat.messages.map((msg, index) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isOwn={msg.senderId === user?.id}
              showAvatar={
                index === 0 ||
                currentChat.messages[index - 1].senderId !== msg.senderId
              }
              user={msg.senderId === user?.id ? user : otherUser.user}
            />
          ))}

          {/* {currentChat.isTyping && currentChat.typingUsers.some(id => id !== currentUser.id) && (
            <TypingIndicator user={otherUser} />
          )} */}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className={cn(
        "p-4 border-t transition-colors duration-300",
        isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      )}>
        <div className="flex items-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "mb-2 transition-colors duration-300",
              isDark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"
            )}
          >
            <Paperclip className="h-5 w-5" />
          </Button>

          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => handleTyping(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className={cn(
                "pr-20 resize-none transition-colors duration-300",
                isDark
                  ? "bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                  : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-purple-500"
              )}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 transition-colors duration-300",
                  isDark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"
                )}
              >
                <Smile className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {message.trim() ? (
            <Button
              onClick={handleSendMessage}
              className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              className={cn(
                "transition-colors duration-300",
                isDark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"
              )}
            >
              <ThumbsUp className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
