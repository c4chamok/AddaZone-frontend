import { useAppSelector } from '@/lib/hooks'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Users, MessageCircle, Phone, Video } from 'lucide-react'
import { setActiveDM, type Friend } from '@/lib/slices/chatSlice'
import { useDispatch } from 'react-redux'
import { setActiveView } from '@/lib/slices/uiSlice'

export const FriendsTab = () => {
  const { conversations, activeDMId } = useAppSelector(state => state.chat)
  const { activeView,  } = useAppSelector(state => state.ui)
  
  // const { friends } = useAppSelector(state => state.chat)
  console.log(activeDMId, activeView);


  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Friends
          </h2>

        </div>

        <Tabs defaultValue="online" className="w-full">
          <TabsList className="grid w-full grid-cols-3" defaultValue={'all'}>
            {/* <TabsTrigger value="online">Online</TabsTrigger> */}
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="blocked">Blocked</TabsTrigger>
          </TabsList>

          {/* <TabsContent value="online" className="space-y-2 mt-4">
            {conversations
              .filter(convo => convo.participants[0].status === 'online')
              .map(convo => (
                <FriendCard key={convo.chatId} friend={convo.participants[0]} />
              ))}
          </TabsContent> */}

          <TabsContent value="all" className="space-y-2 mt-4">
            {conversations.map(convo => (
              <FriendCard key={convo.id} friend={convo.participants[0].user} chatId={convo.id} />
            ))}
          </TabsContent>

          <TabsContent value="pending">
            <div className="text-center text-muted-foreground py-8">
              No pending friend requests.
            </div>
          </TabsContent>

          <TabsContent value="blocked">
            <div className="text-center text-muted-foreground py-8">
              No blocked users.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

const FriendCard = ({ friend, chatId }: { friend: Friend, chatId: string }) => {
  console.log(chatId);
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between p-3 hover:bg-muted rounded-lg">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={friend.avatar} />
          <AvatarFallback>{friend?.name ? friend?.name.split(' ').map((n: string) => n[0]).join('') : friend.username[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{friend?.name ? friend?.name : friend.username}</div>
          <div className="text-sm text-muted-foreground">@{friend.username}</div>
        </div>
        {/* <Badge variant={friend.status === 'online' ? 'default' : 'secondary'}>
          {friend.status}
        </Badge> */}
      </div>
      <div className="flex space-x-2">
        <Button size="sm" variant="outline" onClick={()=>{
            dispatch(setActiveDM(chatId));
            dispatch(setActiveView('friends'));
          }}>
          <MessageCircle className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline">
          <Phone className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline">
          <Video className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}