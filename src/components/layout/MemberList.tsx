import { useAppSelector } from '@/lib/hooks'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
// import { Badge } from '@/components/ui/badge'
import { Crown, Shield } from 'lucide-react'

export const MemberList = () => {
  const { servers, activeServerId } = useAppSelector(state => state.chat)
  const { user } = useAppSelector(state => state.auth)
  
  const activeServer = servers.find(s => s.id === activeServerId)

  if (!activeServer) return null

  // Mock member data - replace with real data
  const members = [
    {
      id: '1',
      username: user?.username || 'User',
      avatar: user?.avatar,
      status: 'online',
      role: 'owner',
    },
    {
      id: '2',
      username: 'Alice',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      status: 'online',
      role: 'admin',
    },
    {
      id: '3',
      username: 'Bob',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      status: 'away',
      role: 'member',
    },
    {
      id: '4',
      username: 'Charlie',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
      status: 'offline',
      role: 'member',
    },
  ]
  type Members = typeof members

  const onlineMembers = members.filter(m => m.status === 'online')
  const offlineMembers = members.filter(m => m.status === 'offline')
  const awayMembers = members.filter(m => m.status === 'away')

  const StatusIndicator = ({ status }: { status: string }) => {
    const colors = {
      online: 'bg-green-500',
      away: 'bg-yellow-500',
      busy: 'bg-red-500',
      offline: 'bg-gray-500',
    }
    return <div className={`w-3 h-3 rounded-full ${colors[status as keyof typeof colors]}`} />
  }

  const RoleIcon = ({ role }: { role: string }) => {
    if (role === 'owner') return <Crown className="h-3 w-3 text-yellow-500" />
    if (role === 'admin') return <Shield className="h-3 w-3 text-blue-500" />
    return null
  }

  const MemberSection = ({ title, members, count }: { title: string; members: Members; count: number }) => (
    <div className="mb-4">
      <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
        {title} — {count}
      </div>
      <div className="space-y-1">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center px-2 py-1 mx-2 rounded hover:bg-gray-800/50 cursor-pointer"
          >
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {member.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1">
                <StatusIndicator status={member.status} />
              </div>
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-medium text-white truncate">
                  {member.username}
                </span>
                <RoleIcon role={member.role} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="w-60 bg-gray-800 border-l border-gray-700">
      <ScrollArea className="h-full">
        <div className="p-4">
          <h3 className="text-white font-semibold mb-4">
            Members — {members.length}
          </h3>
          
          {onlineMembers.length > 0 && (
            <MemberSection 
              title="Online" 
              members={onlineMembers} 
              count={onlineMembers.length} 
            />
          )}
          
          {awayMembers.length > 0 && (
            <MemberSection 
              title="Away" 
              members={awayMembers} 
              count={awayMembers.length} 
            />
          )}
          
          {offlineMembers.length > 0 && (
            <MemberSection 
              title="Offline" 
              members={offlineMembers} 
              count={offlineMembers.length} 
            />
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
