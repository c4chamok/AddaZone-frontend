import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { setServers, setActiveChannel } from '@/lib/slices/chatSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Hash, Plus, Users, Volume2, Video, Globe } from 'lucide-react'

export const ChannelsTab = () => {
  const dispatch = useAppDispatch()
  const { servers } = useAppSelector(state => state.chat)
  const [newChannelName, setNewChannelName] = useState('')
  const [newChannelType, setNewChannelType] = useState<'text' | 'voice' | 'video'>('text')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Mock server data if empty
  React.useEffect(() => {
    if (servers.length === 0) {
      dispatch(setServers([
        {
          id: '1',
          name: 'Community Server',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CS',
          channels: [
            {
              id: '1',
              name: 'general',
              type: 'text',
              serverId: '1',
              messages: [],
              isPrivate: false,
            },
            {
              id: '2',
              name: 'announcements',
              type: 'text',
              serverId: '1',
              messages: [],
              isPrivate: false,
            },
            {
              id: '3',
              name: 'Voice Lounge',
              type: 'voice',
              serverId: '1',
              messages: [],
              isPrivate: false,
            },
          ],
          members: ['1', '2', '3'],
          isOwner: true,
        },
      ]))
    }
  }, [servers.length, dispatch])

  const allChannels = servers.flatMap(server => 
    server.channels.map(channel => ({ ...channel, serverName: server.name }))
  )

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'voice':
        return Volume2
      case 'video':
        return Video
      default:
        return Hash
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Hash className="h-5 w-5 mr-2" />
            Channels
          </h2>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Channel
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Channel</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="channelName">Channel Name</Label>
                  <Input
                    id="channelName"
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                    placeholder="Enter channel name"
                  />
                </div>
                <div>
                  <Label htmlFor="channelType">Channel Type</Label>
                  <select
                    id="channelType"
                    value={newChannelType}
                    onChange={(e) => setNewChannelType(e.target.value as 'text' | 'voice' | 'video')}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="text">Text</option>
                    <option value="voice">Voice</option>
                    <option value="video">Video</option>
                  </select>
                </div>
                <Button className="w-full">
                  Create Channel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            Discover Public Channels
          </h3>
          <Button variant="outline" className="w-full">
            Browse Public Channels
          </Button>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Your Channels</h3>
          {allChannels.map(channel => {
            const Icon = getChannelIcon(channel.type)
            return (
              <div
                key={channel.id}
                className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer"
                onClick={() => dispatch(setActiveChannel({ serverId: channel.serverId, channelId: channel.id }))}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{channel.name}</div>
                    <div className="text-sm text-muted-foreground">{channel.serverName}</div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {channel.type}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {servers.find(s => s.id === channel.serverId)?.members.length || 0}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}