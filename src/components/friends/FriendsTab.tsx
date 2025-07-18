import { useAppSelector } from '@/lib/hooks'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Users, MessageCircle, Phone, Video } from 'lucide-react'
import type { Friend } from '@/lib/slices/chatSlice'

export const FriendsTab = () => {
  const { friends } = useAppSelector(state => state.chat)

  // Mock friends data
  // React.useEffect(() => {
  //   if (friends.length === 0) {
  //     dispatch(setFriends([
  //       {
  //         id: '1',
  //         username: 'alice_wonder',
  //         name: 'Alice Wonder',
  //         email: 'alice@example.com',
  //         avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
  //         status: 'online',
  //         isBlocked: false,
  //         lastSeen: new Date()
  //       },
  //       {
  //         id: '2',
  //         username: 'bob_builder',
  //         name: 'Bob Builder',
  //         email: 'bob@example.com',
  //         avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
  //         status: 'away',
  //         isBlocked: false,
  //         lastSeen: new Date(Date.now() - 3600000)
  //       }
  //     ]))
  //   }
  // }, [friends.length, dispatch])


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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="online">Online</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="blocked">Blocked</TabsTrigger>
          </TabsList>

          <TabsContent value="online" className="space-y-2 mt-4">
            {friends
              .filter(friend => friend.status === 'online')
              .map(friend => (
                <FriendCard key={friend.id} friend={friend} />
              ))}
          </TabsContent>

          <TabsContent value="all" className="space-y-2 mt-4">
            {friends.map(friend => (
              <FriendCard key={friend.id} friend={friend} />
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

const FriendCard = ({ friend }: { friend: Friend }) => {
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
        <Button size="sm" variant="outline">
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