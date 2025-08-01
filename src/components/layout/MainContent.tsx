import { useAppSelector } from '@/lib/hooks'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
// import { Badge } from '@/components/ui/badge'
import { Phone, Video, MoreVertical, Search, Paperclip, Smile, Send } from 'lucide-react'
import ChatWindow from '../ChatWindow/ChatWindow'


export const MainContent = () => {
  const { friends, groups, servers, activeDMId, activeGroupId, activeChannelId, activeServerId, conversations } = useAppSelector(state => state.chat)
  const { activeView } = useAppSelector(state => state.ui)
  console.log(friends, groups, servers, activeDMId, activeGroupId, activeChannelId, activeServerId);

  const conversation = conversations.find(convo => convo.id == activeDMId);

  const getActiveContent = () => {
    if (activeDMId) {
      const friend = conversation?.participants[0].user
      if (!friend) return null

      // return (
      //   <div className="flex flex-col h-full overflow-hidden">
      //     {/* Header */}
      //     <div className="flex items-center justify-between p-4 border-b border-gray-800">
      //       <div className="flex items-center">
      //         <Avatar className="h-8 w-8 mr-3">
      //           <AvatarImage src={friend.avatar} />
      //           <AvatarFallback>{friend?.name ? friend?.name[0] : friend.username[0]}</AvatarFallback>
      //         </Avatar>
      //         <div>
      //           <div className="text-white font-medium">{friend?.name ? friend?.name : friend.username}</div>
      //           {/* <Badge variant={friend.status === 'online' ? 'default' : 'secondary'}>
      //             {friend.status}
      //           </Badge> */}
      //         </div>
      //       </div>
      //       <div className="flex items-center space-x-2">
      //         <Button size="sm" variant="ghost">
      //           <Phone className="h-4 w-4" />
      //         </Button>
      //         <Button size="sm" variant="ghost">
      //           <Video className="h-4 w-4" />
      //         </Button>
      //         <Button size="sm" variant="ghost">
      //           <Search className="h-4 w-4" />
      //         </Button>
      //         <Button size="sm" variant="ghost">
      //           <MoreVertical className="h-4 w-4" />
      //         </Button>
      //       </div>
      //     </div>

      //     {/* Messages */}
      //     <div className="flex-1 overflow-y-auto p-4">
      //       {
      //         (conversation?.messages as Message[]).length > 0 ?
      //           (conversation?.messages.map((convo, idx) => (
      //             <div key={idx} className='text-white rounded-4xl'>
      //               {
      //                 convo.content
      //               }
      //             </div>)
      //           )) :
      //           (<div className="text-center text-gray-400 py-8">
      //             Start your conversation with {friend.name}
      //           </div>)

      //       }

      //     </div>

      //     {/* Message Input */}
      //     <div className="p-4 border-t border-gray-800">
      //       <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
      //         <Button size="sm" variant="ghost">
      //           <Paperclip className="h-4 w-4" />
      //         </Button>
      //         <Input
      //           onChange={(e) => setInputMessage({ messageText: e.target.value })}
      //           placeholder={`Message ${friend.name}`}
      //           className="flex-1"
      //         />
      //         <Button size="sm" variant="ghost">
      //           <Smile className="h-4 w-4" />
      //         </Button>
      //         <Button size="sm" type='submit'>
      //           <Send className="h-4 w-4" />
      //         </Button>
      //       </form>
      //     </div>
      //   </div>
      // )
      return (<ChatWindow/>)
    }

    if (activeGroupId) {
      const group = groups.find(g => g.id === activeGroupId)
      if (!group) return null

      return (
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src={group.avatar} />
                <AvatarFallback>{group.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-white font-medium">{group.name}</div>
                <div className="text-gray-400 text-sm">{group.members.length} members</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost">
                <Phone className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost">
                <Video className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost">
                <Search className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="text-center text-gray-400 py-8">
              Welcome to {group.name}!
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder={`Message ${group.name}`}
                className="flex-1"
              />
              <Button size="sm" variant="ghost">
                <Smile className="h-4 w-4" />
              </Button>
              <Button size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )
    }

    // if (activeChannelId && activeServerId) {
    //   const server = servers.find(s => s.id === activeServerId)
    //   const channel = server?.channels.find(c => c.id === activeChannelId)
    //   if (!channel) return null

    //   return (
    //     <div className="flex flex-col h-full">
    //       {/* Header */}
    //       <div className="flex items-center justify-between p-4 border-b border-gray-800">
    //         <div className="flex items-center">
    //           <div>
    //             <div className="text-white font-medium"># {channel.name}</div>
    //             <div className="text-gray-400 text-sm">{server?.name}</div>
    //           </div>
    //         </div>
    //         <div className="flex items-center space-x-2">
    //           <Button size="sm" variant="ghost">
    //             <Search className="h-4 w-4" />
    //           </Button>
    //           <Button size="sm" variant="ghost">
    //             <MoreVertical className="h-4 w-4" />
    //           </Button>
    //         </div>
    //       </div>

    //       {/* Messages */}
    //       <div className="flex-1 overflow-y-auto p-4">
    //         <div className="text-center text-gray-400 py-8">
    //           Welcome to #{channel.name}!
    //         </div>
    //       </div>

    //       {/* Message Input */}
    //       <div className="p-4 border-t border-gray-800">
    //         <div className="flex items-center space-x-2">
    //           <Button size="sm" variant="ghost">
    //             <Paperclip className="h-4 w-4" />
    //           </Button>
    //           <Input
    //             placeholder={`Message #${channel.name}`}
    //             className="flex-1"
    //           />
    //           <Button size="sm" variant="ghost">
    //             <Smile className="h-4 w-4" />
    //           </Button>
    //           <Button size="sm">
    //             <Send className="h-4 w-4" />
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //   )
    // }

  
    // Default content when nothing is selected


    const getDefaultMessage = () => {
      switch (activeView) {
        case 'friends':
          return 'Select a friend to start chatting'
        case 'groups':
          return 'Select a group to start chatting'
        case 'channels':
          return 'Select a channel to start chatting'
        default:
          return 'Welcome to ChatApp'
      }
    }

    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-xl mb-2">{getDefaultMessage()}</div>
          <div className="text-sm">Choose from the sidebar to get started</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-gray-800 h-full">
      {getActiveContent()}
    </div>
  )
}
