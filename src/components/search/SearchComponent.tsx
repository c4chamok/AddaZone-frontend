import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { addFriend, setActiveDM, setSearchResults } from '@/lib/slices/chatSlice'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, UserPlus, MessageCircle, Phone, Video } from 'lucide-react'
import { setActiveView } from '@/lib/slices/uiSlice'
import useAxiosInstance from '@/hooks/axiosHooks'

export const SearchComponent = () => {
  const dispatch = useAppDispatch()
  const { searchResults } = useAppSelector(state => state.chat)
  const { axiosSecure } = useAxiosInstance()
  const [query, setQuery] = useState('')

  const chatInitFromUI = (user: {id: string, username: string, email: string}) => {
    dispatch(addFriend(user))
    dispatch(setActiveDM(user.id))
    dispatch(setActiveView('friends'))
  }

  const handleSearch = async () => {
    if (!query.trim()) return

    // Mock search results - replace with real API call
    const { data, statusText } = await axiosSecure(`/users/find?userName=${query}`);
    console.log(data);

    if (!data?.success || data.users.length) {
      console.error('could not fetch users', statusText );
    }
    // const mockUsers = [
    //   {
    //     id: '1',
    //     username: 'john_doe',
    //     name: 'John Doe',
    //     email: 'john@example.com',
    //     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    //     status: 'online' as const,
    //     isBlocked: false
    //   },
    //   {
    //     id: '2',
    //     username: 'jane_smith',
    //     name: 'Jane Smith',
    //     email: 'jane@example.com',
    //     phone: '+1234567890',
    //     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    //     status: 'away' as const,
    //     isBlocked: false
    //   }
    // ].filter(user =>
    //   user.username.toLowerCase().includes(query.toLowerCase()) ||
    //   user.name.toLowerCase().includes(query.toLowerCase()) ||
    //   user.email.toLowerCase().includes(query.toLowerCase())
    // )

    dispatch(setSearchResults({ users: data.users }))
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Search by username, name, email, or phone..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-2">
          {searchResults.users.map((user) => (
            <Card key={user.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user?.name ? user.name.split(' ').map(n => n[0]).join('') : user.username[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.username}</div>
                      <div className="text-sm text-muted-foreground">@{user.username}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                      {user.phone && (
                        <div className="text-sm text-muted-foreground">{user.phone}</div>
                      )}
                    </div>
                    {/* <Badge variant={user.status === 'online' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge> */}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <UserPlus className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={()=>chatInitFromUI(user)}>
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
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="groups">
          <div className="text-center text-muted-foreground py-8">
            No groups found. Try a different search term.
          </div>
        </TabsContent>

        <TabsContent value="channels">
          <div className="text-center text-muted-foreground py-8">
            No channels found. Try a different search term.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}