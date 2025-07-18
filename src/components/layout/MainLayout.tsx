import { useAppSelector } from '@/lib/hooks'
import { TabNavigation } from './TabNavigation'
import { SecondarySidebar } from './SecondarySidebar'
import { MainContent } from './MainContent'
import { FeedTab } from '../feed/FeedTab'
import { NearbyTab } from '../nearby/NearbyTab'
import { SettingsPage } from '../settings/SettingsPage'
import { ProfilePage } from '../profile/ProfilePage'
import { CallInterface } from '../call/CallInterface'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { SearchComponent } from '../search/SearchComponent'
// import { initializeSocket } from '@/lib/socket'

export const MainLayout = () => {
  const { user } = useAppSelector(state => state.auth)
  const { activeView } = useAppSelector(state => state.ui)

  console.log(user);

  const renderMainContent = () => {
    switch (activeView) {
      case 'feed':
        return <FeedTab />
      case 'nearby':
        return <NearbyTab />
      case 'settings':
        return <SettingsPage />
      case 'profile':
        return <ProfilePage />
      case 'call':
        return <CallInterface />
      case 'search':
        return <SearchComponent />
      default:
        return (
          <ResizablePanelGroup direction="horizontal" className="flex-1">
            <ResizablePanel defaultSize={15} minSize={15} maxSize={40}>
              <SecondarySidebar activeView={activeView} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>
              <MainContent />
            </ResizablePanel>
          </ResizablePanelGroup>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <TabNavigation />
      <div className="flex-1 flex flex-col md:pb-0 pb-20">
        {renderMainContent()}
      </div>
    </div>
  )
}
