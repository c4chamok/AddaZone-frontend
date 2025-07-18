
import { Socket } from 'socket.io-client'
let socket: Socket | null = null

export const initializeSocket = (userId: string) => {
  // For demo purposes, we'll skip socket connection to avoid browser errors
  // You can enable this when you have a real socket server
  console.log('Socket initialization skipped for demo')
  return null
}

export const getSocket = () => socket

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
