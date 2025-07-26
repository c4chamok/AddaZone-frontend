import { createContext, useContext } from 'react';
import { io } from 'socket.io-client';


const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://192.168.0.113:5800', {
  withCredentials: true,
});

export default socket;

export const SocketContext = createContext(socket);
export const useSocket = () => useContext(SocketContext);
