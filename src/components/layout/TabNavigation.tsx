import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { setActiveView } from '@/lib/slices/uiSlice'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, MessageCircle, Hash, Rss, MapPin, Settings, User, Search } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuth from '@/hooks/useAuth'

export const TabNavigation = () => {
  const dispatch = useAppDispatch()
  const { activeView } = useAppSelector(state => state.ui)
  const { userLogout } = useAuth()
  const { friends, groups } = useAppSelector(state => state.chat)

  const tabs = [
    {
      id: 'friends' as const,
      label: 'Friends',
      icon: Users,
      badge: friends.filter(f => f.status === 'online').length
    },
    {
      id: 'groups' as const,
      label: 'Groups',
      icon: MessageCircle,
      badge: groups.filter(g => g.messages.length > 0).length
    },
    {
      id: 'channels' as const,
      label: 'Channels',
      icon: Hash,
      badge: 0
    },
    {
      id: 'feed' as const,
      label: 'Feed',
      icon: Rss,
      badge: 0
    },
    {
      id: 'nearby' as const,
      label: 'Nearby',
      icon: MapPin,
      badge: 3
    },
    {
      id: 'search' as const,
      label: 'Search',
      icon: Search,
      badge: 0
    },
  ]

  return (
    <>
      {/* Desktop Navigation - Left Side */}
      <div className="hidden md:flex w-16 bg-gray-900 flex-col items-center py-3 space-y-2 h-screen">
        {tabs.map((tab) => (
          <div key={tab.id} className="relative">
            <Button
              variant={activeView === tab.id ? 'default' : 'ghost'}
              size="icon"
              className="w-12 h-12 rounded-2xl hover:rounded-xl transition-all duration-200"
              onClick={() => dispatch(setActiveView(tab.id))}
            >
              <tab.icon className="h-5 w-5" />
            </Button>
            {tab.badge > 0 && (
              <Badge className="absolute -top-1 -right-1 px-1 py-0 text-xs h-5 w-5 rounded-full flex items-center justify-center">
                {tab.badge}
              </Badge>
            )}
          </div>
        ))}

        <div className="flex-1" />

        {/* Settings */}
        <Button
          variant={activeView === 'settings' ? 'default' : 'ghost'}
          size="icon"
          className="w-12 h-12 rounded-2xl hover:rounded-xl transition-all duration-200"
          onClick={() => dispatch(setActiveView('settings'))}
        >
          <Settings className="h-5 w-5" />
        </Button>

        {/* Profile */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* <Button variant="outline">Open</Button> */}
            <Button
              variant={activeView === 'profile' ? 'default' : 'ghost'}
              size="icon"
              className="w-12 h-12 rounded-2xl hover:rounded-xl transition-all duration-200"
            >
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => dispatch(setActiveView('profile'))}
            >
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='cursor-pointer'
              onClick={()=>userLogout()}
            >
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Navigation - Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-50">
        <div className="flex items-center justify-around py-2 px-4">
          {tabs.map((tab) => (
            <div key={tab.id} className="relative flex flex-col items-center">
              <Button
                variant={activeView === tab.id ? 'default' : 'ghost'}
                size="icon"
                className="w-10 h-10 rounded-xl transition-all duration-200"
                onClick={() => dispatch(setActiveView(tab.id))}
              >
                <tab.icon className="h-4 w-4" />
              </Button>
              <span className="text-xs text-gray-300 mt-1">{tab.label}</span>
              {tab.badge > 0 && (
                <Badge className="absolute -top-1 -right-1 px-1 py-0 text-xs h-4 w-4 rounded-full flex items-center justify-center">
                  {tab.badge}
                </Badge>
              )}
            </div>
          ))}

          <div className="flex flex-col items-center">
            <Button
              variant={activeView === 'settings' ? 'default' : 'ghost'}
              size="icon"
              className="w-10 h-10 rounded-xl transition-all duration-200"
              onClick={() => dispatch(setActiveView('settings'))}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <span className="text-xs text-gray-300 mt-1">Settings</span>
          </div>
        </div>
      </div>
    </>
  )
}
