import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/lib/hooks';
import type { Friend } from '@/lib/slices/chatSlice';

interface TypingIndicatorProps {
  user: Friend;
}

const TypingIndicator = ({ user }: TypingIndicatorProps) => {
  const { theme } = useAppSelector(state => state.ui);
  const isDark = theme === 'dark';

  return (
    <div className="flex gap-2 items-end animate-fade-in">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.avatar} />
        <AvatarFallback className={cn(
          "text-xs transition-colors duration-300",
          isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
        )}>
          {user.username.split(' ').map(n => n[0]).join('').toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className={cn(
        "px-4 py-3 rounded-2xl rounded-bl-md transition-colors duration-300",
        isDark ? "bg-gray-700" : "bg-gray-200"
      )}>
        <div className="flex gap-1">
          <div className={cn(
            "w-2 h-2 rounded-full animate-bounce transition-colors duration-300",
            isDark ? "bg-gray-400" : "bg-gray-500"
          )} style={{ animationDelay: '0ms' }} />
          <div className={cn(
            "w-2 h-2 rounded-full animate-bounce transition-colors duration-300",
            isDark ? "bg-gray-400" : "bg-gray-500"
          )} style={{ animationDelay: '150ms' }} />
          <div className={cn(
            "w-2 h-2 rounded-full animate-bounce transition-colors duration-300",
            isDark ? "bg-gray-400" : "bg-gray-500"
          )} style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
