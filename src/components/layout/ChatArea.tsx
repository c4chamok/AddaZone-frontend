
import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { addMessage } from '@/lib/slices/chatSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Hash, Send, Paperclip, Smile, Gift, Users } from 'lucide-react'
import { toggleMemberList } from '@/lib/slices/uiSlice'

export const ChatArea = () => {
  const dispatch = useAppDispatch()
  const [messageText, setMessageText] = useState('')
  const { servers, activeServerId, activeChannelId } = useAppSelector(state => state.chat)
  const { user } = useAppSelector(state => state.auth)
  // const { showMemberList } = useAppSelector(state => state.ui)

  const activeServer = servers.find(s => s.id === activeServerId)
  const activeChannel = activeServer?.channels.find(c => c.id === activeChannelId)

  const handleSendMessage = () => {
    if (!messageText.trim() || !activeChannelId || !user) return

    const newMessage = {
      id: Date.now().toString(),
      content: messageText,
      senderId: user.id,
      senderName: user.username,
      timestamp: new Date(),
      type: 'text' as const,
    }

    dispatch(addMessage({ channelId: activeChannelId, message: newMessage }))
    setMessageText('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!activeChannel) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-700">
        <div className="text-center">
          <Hash className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Welcome to {activeServer?.name || 'ChatApp'}
          </h3>
          <p className="text-gray-400">
            Select a channel to start chatting
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-700">
      {/* Channel Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-gray-600 bg-gray-800">
        <div className="flex items-center">
          <Hash className="h-5 w-5 text-gray-400 mr-2" />
          <span className="font-semibold text-white">{activeChannel.name}</span>
          <div className="ml-4 h-4 w-px bg-gray-600" />
          <span className="ml-4 text-sm text-gray-400">
            Welcome to #{activeChannel.name}!
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={() => dispatch(toggleMemberList())}
          >
            <Users className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {activeChannel.messages.length === 0 ? (
            <div className="text-center py-8">
              <Hash className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">
                This is the beginning of the #{activeChannel.name} channel.
              </p>
            </div>
          ) : (
            activeChannel.messages.map((message) => (
              <div key={message.id} className="flex items-start space-x-3 hover:bg-gray-800/50 p-2 rounded">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${message.senderName}`} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {message.senderName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-medium text-white">{message.senderName}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-300 mt-1">{message.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4">
        <div className="flex items-center space-x-2 bg-gray-600 rounded-lg p-2">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message #${activeChannel.name}`}
            className="flex-1 bg-transparent border-none focus-visible:ring-0 text-white placeholder-gray-400"
          />
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
            <Gift className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
            <Smile className="h-4 w-4" />
          </Button>
          <Button 
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            size="sm" 
            className="p-1"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
