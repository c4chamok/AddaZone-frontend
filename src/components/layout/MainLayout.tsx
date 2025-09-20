import { TabNavigation } from './TabNavigation'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <TabNavigation />
      <div className="flex-1 flex flex-col md:pb-0 pb-20">
        {children}
      </div>
    </div>
  )
}
