import { setActiveDM } from "@/lib/slices/chatSlice";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Plus, } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Badge } from "@/components/ui/badge";

interface Friend {
  id: string
  username: string
  name: string
  email: string
  phone?: string
  avatar?: string
  status: 'online' | 'offline' | 'away' | 'busy'
  isBlocked: boolean
  lastSeen?: Date
}

const FriendsTabContent = ({friends, setIsSearchMode}: {friends: Friend[]; setIsSearchMode: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const dispatch = useAppDispatch()
    const { activeDMId } = useAppSelector(state => state.chat)
    const [friendsFilter, setFriendsFilter] = useState('all')


    const filteredFriends = friends.filter(friend => {
        switch (friendsFilter) {
            case 'online':
                return friend.status === 'online'
            case 'pending':
                return false // Mock pending requests
            case 'blocked':
                return friend.isBlocked
            default:
                return !friend.isBlocked
        }
    })

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-800">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Friends</h3>
                    <Button size="sm" variant="ghost" onClick={() => setIsSearchMode(true)}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                <Select value={friendsFilter} onValueChange={setFriendsFilter}>
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Friends</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex-1 overflow-y-auto">
                {filteredFriends.map(friend => (
                    <div
                        key={friend.id}
                        className={`flex items-center p-3 hover:bg-gray-800 cursor-pointer ${activeDMId === friend.id ? 'bg-gray-700' : ''
                            }`}
                        onClick={() => dispatch(setActiveDM(friend.id))}
                    >
                        <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src={friend.avatar} />
                            <AvatarFallback>{friend.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="text-white font-medium">{friend.name}</div>
                            <div className="text-gray-400 text-sm">@{friend.username}</div>
                        </div>
                        <Badge variant={friend.status === 'online' ? 'default' : 'secondary'}>
                            {friend.status}
                        </Badge>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default FriendsTabContent;