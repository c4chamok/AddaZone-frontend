
import { useDispatch } from 'react-redux';
// import { setActiveChat, setSearchQuery } from '@/store/chatSlice';
// import { toggleTheme } from '@/store/themeSlice';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
// import { Separator } from '@/components/ui/separator';
// import { 
//   Search, 
//   MoreHorizontal, 
//   Edit, 
//   Moon, 
//   Sun,
//   Users,
//   MessageSquare,
//   Phone,
//   Video
// } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatListItem from './ChatListItem';
import LoadingSkeleton from './LoadingSkeleton';
import { useAppSelector } from '@/lib/hooks';
import { setActiveDM } from '@/lib/slices/chatSlice';

const ChatSidebar = () => {
  const dispatch = useDispatch();
  const { conversations, } = useAppSelector(state => state.chat);
  const isLoading = false
  // const { user } = useAppSelector(state => state.auth);
  const { theme } = useAppSelector(state => state.ui);
  const isDark = theme === 'dark';

  console.log(conversations);

  return (
    <div className={cn(
      "w-full border-r transition-colors duration-300 flex flex-col",
      isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
    )}>
      {/* Header */}
      <h1 className={cn(
        "text-xl font-bold p-4 border-b transition-colors duration-300",
        isDark ? "text-white border-gray-700" : "text-gray-900 border-gray-200"
      )}>
        Chats
      </h1>


      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {isLoading ? (
            <LoadingSkeleton count={5} />
          ) : (
            <div className="space-y-1">
              {conversations.map((chat,) => (
                <ChatListItem
                  key={chat?.id}
                  chat={chat}
                  onClick={() => dispatch(setActiveDM(chat.id))}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
