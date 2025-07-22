import SocketProvider from '@/lib/providers/SocketProvider'
import { MainLayout } from './layout/MainLayout'

export const ChatApp = () => {
  return (
    <SocketProvider>
      <MainLayout />
    </SocketProvider>
  )
}
