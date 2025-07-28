
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
  // const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'groups' | 'communities'>('all');

  // const filteredChats = conversations.filter(chat => {
    // const otherUser = chat.participants.find(p => p.id !== user?.id);
    // const matchesSearch = otherUser?.name.toLowerCase().includes(searchQuery.toLowerCase()) ?? false;
    
    // switch (activeTab) {
    //   case 'unread':
    //     return matchesSearch && chat.unreadCount > 0;
    //   case 'groups':
    //     return matchesSearch && chat.participants.length > 2;
    //   case 'communities':
    //     return matchesSearch && false; // Placeholder for communities
    //   default:
    //     return matchesSearch;
    // }
  // });

  return (
    <div className={cn(
      "w-full border-r transition-colors duration-300 flex flex-col",
      isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
    )}>
      {/* Header */}
      <div className={cn(
        "p-4 border-b transition-colors duration-300",
        isDark ? "border-gray-700" : "border-gray-200"
      )}>
        <div className="flex items-center justify-between mb-4">
          <h1 className={cn(
            "text-xl font-bold transition-colors duration-300",
            isDark ? "text-white" : "text-gray-900"
          )}>
            Chats
          </h1>
          {/*<div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(toggleTheme())}
              className={cn(
                "transition-colors duration-300",
                isDark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"
              )}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "transition-colors duration-300",
                isDark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"
              )}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "transition-colors duration-300",
                isDark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"
              )}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>*/}
        </div>

        {/* Search 
        <div className="relative">
          <Search className={cn(
            "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-300",
            isDark ? "text-gray-400" : "text-gray-500"
          )} />
          <Input
            placeholder="Search Messenger"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className={cn(
              "pl-10 transition-colors duration-300",
              isDark 
                ? "bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-500" 
                : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-purple-500"
            )}
          />
        </div>*/}
      </div>

      {/* Navigation Tabs */}
      {/* <div className={cn(
        "flex p-2 gap-1 border-b transition-colors duration-300",
        isDark ? "border-gray-700" : "border-gray-200"
      )}>
        {[
          { key: 'all', label: 'All', icon: MessageSquare },
          { key: 'unread', label: 'Unread', icon: MessageSquare },
          { key: 'groups', label: 'Groups', icon: Users },
          { key: 'communities', label: 'Communities', icon: Users },
        ].map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            variant={activeTab === key ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(key as any)}
            className={cn(
              "flex-1 transition-all duration-300",
              activeTab === key
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : isDark
                ? "text-gray-400 hover:bg-gray-700 hover:text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <Icon className="h-4 w-4 mr-2" />
            {label}
          </Button>
        ))}
      </div> */}

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {isLoading ? (
            <LoadingSkeleton count={5} />
          ) : (
            <div className="space-y-1">
              {conversations.map((chat) => (
                <ChatListItem
                  key={chat.id}
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
