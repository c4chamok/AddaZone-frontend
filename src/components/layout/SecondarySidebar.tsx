
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { setActiveGroup, setActiveChannel, setSearchResults } from '@/lib/slices/chatSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Plus, MoreVertical, UserPlus, MessageCircle } from 'lucide-react'
import FriendsTabContent from '../SidebarTabs/FriendsTabContent'
import { FriendsTab } from '../friends/FriendsTab'
import { GroupsTab } from '../groups/GroupsTab'
import { ChannelsTab } from '../channels/ChannelsTab'

interface SecondarySidebarProps {
  activeView: string
}

export const SecondarySidebar = ({ activeView }: SecondarySidebarProps) => {
  const dispatch = useAppDispatch()
  const { friends, groups, servers, activeGroupId, activeChannelId, searchResults } = useAppSelector(state => state.chat)
  const [selectedServerId, setSelectedServerId] = useState<string | null>(null)
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')


  const handleSearch = (query: string) => {
    if (!query.trim()) {
      dispatch(setSearchResults({ users: [] }))
      return
    }

    // Mock search results - replace with real API call
    const mockUsers = [
      {
        id: '3',
        username: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        status: 'online' as const,
        isBlocked: false
      },
      {
        id: '4',
        username: 'jane_smith',
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
        status: 'away' as const,
        isBlocked: false
      },
      {
        id: '5',
        username: 'mike_wilson',
        name: 'Mike Wilson',
        email: 'mike@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        status: 'offline' as const,
        isBlocked: false
      }
    ].filter(user => 
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    )

    dispatch(setSearchResults({ users: mockUsers }))
  }

  const renderSearchResults = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center mb-4">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setIsSearchMode(false)
              setSearchQuery('')
              dispatch(setSearchResults({ users: [] }))
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            handleSearch(e.target.value)
          }}
          className="mb-4"
        />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {searchResults.users.map(user => (
          <Card key={user.id} className='dark'>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-white">{user.name}</div>
                    <div className="text-sm text-gray-400">@{user.username}</div>
                  </div>
                  <Badge variant={user.status === 'online' ? 'default' : 'secondary'}>
                    {user.status}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderFriendsTab = () => {
    if (isSearchMode) {
      return renderSearchResults()
    }

    return <FriendsTabContent friends={friends} setIsSearchMode={setIsSearchMode}/>
    
  }

  const renderGroupsTab = () => {
    if (isSearchMode) {
      return renderSearchResults()
    }

    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Groups</h3>
            <Button size="sm" variant="ghost" onClick={() => setIsSearchMode(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {groups.map(group => (
            <div
              key={group.id}
              className={`flex items-center p-3 hover:bg-gray-800 cursor-pointer ${
                activeGroupId === group.id ? 'bg-gray-700' : ''
              }`}
              onClick={() => dispatch(setActiveGroup(group.id))}
            >
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src={group.avatar} />
                <AvatarFallback>{group.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-white font-medium">{group.name}</div>
                <div className="text-gray-400 text-sm">{group.members.length} members</div>
              </div>
              <Button size="sm" variant="ghost">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderChannelsTab = () => {
    if (isSearchMode) {
      return renderSearchResults()
    }

    if (selectedServerId) {
      const server = servers.find(s => s.id === selectedServerId)
      if (!server) return null

      return (
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center mb-4">
              <Button
                size="sm"
                variant="ghost"
                className="mr-2"
                onClick={() => setSelectedServerId(null)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold text-white">{server.name}</h3>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {server.channels.map(channel => (
              <div
                key={channel.id}
                className={`flex items-center p-3 hover:bg-gray-800 cursor-pointer ${
                  activeChannelId === channel.id ? 'bg-gray-700' : ''
                }`}
                onClick={() => dispatch(setActiveChannel({ serverId: server.id, channelId: channel.id }))}
              >
                <div className="flex-1">
                  <div className="text-white font-medium"># {channel.name}</div>
                  <div className="text-gray-400 text-sm">{channel.type} channel</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Servers</h3>
            <Button size="sm" variant="ghost" onClick={() => setIsSearchMode(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {servers.map(server => (
            <div
              key={server.id}
              className="flex items-center p-3 hover:bg-gray-800 cursor-pointer"
              onClick={() => setSelectedServerId(server.id)}
            >
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src={server.avatar} />
                <AvatarFallback>{server.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-white font-medium">{server.name}</div>
                <div className="text-gray-400 text-sm">{server.channels.length} channels</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeView) {
      case 'friends':
        return <FriendsTab/>
      case 'groups':
        return <GroupsTab/>
      case 'channels':
        return <ChannelsTab/>
      default:
        return null
    }
  }

  if (!['friends', 'groups', 'channels'].includes(activeView)) {
    return null
  }

  return (
    <div className="w-full bg-gray-900 border-r border-gray-800 h-full">
      {renderContent()}
    </div>
  )
}