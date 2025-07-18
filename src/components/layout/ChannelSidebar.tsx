
// import React from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { setActiveChannel } from '@/lib/slices/chatSlice'
// import { toggleMemberList } from '@/lib/slices/uiSlice'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
// import { Separator } from '@/components/ui/separator'
import { Hash, Volume2, Settings, UserPlus, Bell } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const ChannelSidebar = () => {
  const dispatch = useAppDispatch()
  const { servers, activeServerId, activeChannelId } = useAppSelector(state => state.chat)
  const { user } = useAppSelector(state => state.auth)
  
  const activeServer = servers.find(s => s.id === activeServerId)

  if (!activeServer) {
    return (
      <div className="w-60 bg-gray-800 flex flex-col">
        <div className="h-12 px-4 flex items-center border-b border-gray-700">
          <span className="font-semibold text-white">Select a server</span>
        </div>
      </div>
    )
  }

  const handleChannelClick = (channelId: string) => {
    dispatch(setActiveChannel({ serverId: activeServer.id, channelId }))
  }

  const textChannels = activeServer.channels.filter(c => c.type === 'text')
  const voiceChannels = activeServer.channels.filter(c => c.type === 'voice')

  return (
    <div className="w-60 bg-gray-800 flex flex-col">
      {/* Server Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-gray-700 hover:bg-gray-700 cursor-pointer transition-colors">
        <span className="font-semibold text-white truncate">{activeServer.name}</span>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {/* Text Channels */}
          {textChannels.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between px-2 py-1 mb-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Text Channels
                </span>
                <Button variant="ghost" size="sm" className="h-4 w-4 p-0 text-gray-400 hover:text-white">
                  <UserPlus className="h-3 w-3" />
                </Button>
              </div>
              {textChannels.map((channel) => (
                <Button
                  key={channel.id}
                  variant="ghost"
                  className={`w-full justify-start px-2 py-1 h-8 text-left font-medium ${
                    activeChannelId === channel.id
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                  onClick={() => handleChannelClick(channel.id)}
                >
                  <Hash className="h-4 w-4 mr-2" />
                  <span className="truncate">{channel.name}</span>
                </Button>
              ))}
            </div>
          )}

          {/* Voice Channels */}
          {voiceChannels.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between px-2 py-1 mb-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Voice Channels
                </span>
                <Button variant="ghost" size="sm" className="h-4 w-4 p-0 text-gray-400 hover:text-white">
                  <UserPlus className="h-3 w-3" />
                </Button>
              </div>
              {voiceChannels.map((channel) => (
                <Button
                  key={channel.id}
                  variant="ghost"
                  className="w-full justify-start px-2 py-1 h-8 text-left font-medium text-gray-300 hover:bg-gray-700/50 hover:text-white"
                  onClick={() => handleChannelClick(channel.id)}
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  <span className="truncate">{channel.name}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* User Panel */}
      <div className="h-14 bg-gray-900 px-2 flex items-center">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            {user?.username?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="ml-2 flex-1 min-w-0">
          <div className="text-sm font-medium text-white truncate">
            {user?.username}
          </div>
          <div className="text-xs text-gray-400 truncate">
            #{user?.id?.substring(0, 4)}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-white">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-white">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
