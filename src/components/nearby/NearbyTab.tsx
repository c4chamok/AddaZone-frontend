
import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { setNearbyUsers } from '@/lib/slices/chatSlice'
import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { MapPin, MessageCircle, UserPlus, List, Map, Eye, EyeOff } from 'lucide-react'

export const NearbyTab = () => {
  const dispatch = useAppDispatch()
  const { nearbyUsers } = useAppSelector(state => state.chat)
  const [distance, setDistance] = useState([5])
  const [showMap, setShowMap] = useState(false)
  const [ghostMode, setGhostMode] = useState(false)

  useEffect(() => {
    // Mock nearby users data - replace with real location-based data
    const mockNearbyUsers = [
      {
        id: '2',
        username: 'Alice_Explorer',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
        distance: '0.8 km',
        status: 'online',
        bio: 'Love hiking and photography 📸',
        interests: ['Photography', 'Hiking', 'Travel'],
        lastSeen: '2 min ago',
      },
      {
        id: '3',
        username: 'TechGuru_Bob',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
        distance: '1.2 km',
        status: 'online',
        bio: 'Software developer & coffee enthusiast ☕',
        interests: ['Programming', 'Gaming', 'Coffee'],
        lastSeen: '5 min ago',
      },
      {
        id: '4',
        username: 'Foodie_Sarah',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        distance: '2.1 km',
        status: 'away',
        bio: 'Always searching for the best local food!',
        interests: ['Cooking', 'Restaurants', 'Food Photography'],
        lastSeen: '15 min ago',
      },
      {
        id: '5',
        username: 'MusicLover',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Music',
        distance: '3.5 km',
        status: 'online',
        bio: 'Musician and concert enthusiast 🎵',
        interests: ['Music', 'Concerts', 'Guitar'],
        lastSeen: '1 min ago',
      },
    ]
    
    dispatch(setNearbyUsers(mockNearbyUsers))
  }, [dispatch])

  // const StatusIndicator = ({ status }: { status: string }) => {
  //   const colors = {
  //     online: 'bg-green-500',
  //     away: 'bg-yellow-500',
  //     busy: 'bg-red-500',
  //     offline: 'bg-gray-500',
  //   }
  //   return <div className={`w-3 h-3 rounded-full ${colors[status as keyof typeof colors]}`} />
  // }

  const UserCard = ({ user }: { user: typeof nearbyUsers[0] }) => (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1">
              {/* <StatusIndicator status={user.status} /> */}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white truncate">{user.username}</h3>
              <Badge variant="secondary" className="text-xs">
                {user.distance}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-400 mt-1">{user.bio}</p>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {user.interests.slice(0, 3).map((interest: string) => (
                <Badge key={interest} variant="outline" className="text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">Last seen {user.lastSeen}</span>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="h-8">
                  <UserPlus className="h-3 w-3 mr-1" />
                  Wave
                </Button>
                <Button size="sm" className="h-8">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="flex-1 bg-gray-700">
      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-gray-600 bg-gray-800">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-green-500 mr-2" />
          <span className="font-semibold text-white">Nearby Users</span>
          <Badge className="ml-2" variant="secondary">
            {nearbyUsers.length}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={ghostMode ? "default" : "outline"}
            size="sm"
            onClick={() => setGhostMode(!ghostMode)}
            className="text-xs"
          >
            {ghostMode ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
            {ghostMode ? 'Ghost Mode' : 'Visible'}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 bg-gray-800 border-b border-gray-600">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Distance: {distance[0]} km
            </label>
            <Slider
              value={distance}
              onValueChange={setDistance}
              max={50}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
          
          <Tabs value={showMap ? "map" : "list"} onValueChange={(value) => setShowMap(value === "map")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list" className="flex items-center">
                <List className="h-4 w-4 mr-1" />
                List View
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center">
                <Map className="h-4 w-4 mr-1" />
                Map View
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {showMap ? (
            <div className="bg-gray-600 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <Map className="h-16 w-16 mx-auto mb-4" />
                <p>Map view coming soon!</p>
                <p className="text-sm mt-2">Interactive map with user locations</p>
              </div>
            </div>
          ) : (
            <div>
              {nearbyUsers.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No users nearby</h3>
                  <p className="text-gray-400">
                    Try increasing your search distance or check back later
                  </p>
                </div>
              ) : (
                nearbyUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))
              )}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      <div className="p-4 bg-gray-800 border-t border-gray-600">
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-2">
            {ghostMode ? "You're invisible to nearby users" : "You're visible to nearby users"}
          </p>
          <Button variant="outline" size="sm" className="text-xs">
            Meetup Suggestions
          </Button>
        </div>
      </div>
    </div>
  )
}
