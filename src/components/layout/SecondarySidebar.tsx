import { FriendsTab } from '../friends/FriendsTab'
import { GroupsTab } from '../groups/GroupsTab'
import { ChannelsTab } from '../channels/ChannelsTab'

interface SecondarySidebarProps {
  activeView: string
}

export const SecondarySidebar = ({ activeView }: SecondarySidebarProps) => {


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