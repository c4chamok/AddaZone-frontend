
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/lib/hooks';

interface LoadingSkeletonProps {
  count?: number;
}

const LoadingSkeleton = ({ count = 3 }: LoadingSkeletonProps) => {
  const { theme } = useAppSelector(state => state.ui);
  const isDark = theme === 'dark';
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center p-3 rounded-lg animate-pulse">
          <div className={cn(
            "w-12 h-12 rounded-full transition-colors duration-300",
            isDark ? "bg-gray-700" : "bg-gray-200"
          )} />
          <div className="ml-3 flex-1">
            <div className={cn(
              "h-4 rounded w-3/4 mb-2 transition-colors duration-300",
              isDark ? "bg-gray-700" : "bg-gray-200"
            )} />
            <div className={cn(
              "h-3 rounded w-1/2 transition-colors duration-300",
              isDark ? "bg-gray-600" : "bg-gray-300"
            )} />
          </div>
          <div className={cn(
            "w-8 h-3 rounded transition-colors duration-300",
            isDark ? "bg-gray-700" : "bg-gray-200"
          )} />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
