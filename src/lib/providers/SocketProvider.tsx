import React, { useEffect } from "react";
import { SocketContext, useSocket } from "../socket";
import { useAppSelector } from "../hooks";
import { useDispatch } from "react-redux";
import useAxiosInstance from "@/hooks/axiosHooks";
import { addConversation, addMessage, addOnlineConvos, removeOnlineConvos, type conversation, type Message } from "../slices/chatSlice";



const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAppSelector(state => state.auth);
    const { conversations, onlineConvoIds } = useAppSelector(state => state.chat);
    const { axiosSecure } = useAxiosInstance();
    const socket = useSocket();
    const dispatch = useDispatch()
    console.log(onlineConvoIds);

    useEffect(() => {
        if (isAuthenticated) {
            socket.connect();
        }

        return () => {
            socket.disconnect();
        };
    }, [isAuthenticated, socket]);

    
    useEffect(() => {
        const messageHandler = async (res: Message) => {
            console.log(res);
            const existedConversation = conversations.find(convo => convo.id === res.chatId);
            if (!existedConversation) {
                const { data } = (await axiosSecure.get(`chat/${res.chatId}`)) as { data: {chatInstance: conversation} };
                dispatch(addConversation(data.chatInstance))
                return;
            }
            dispatch(addMessage(res))
        }
        const setOnlineConvosFn = (data: { onlineConvoIds: string[] }) =>{
            console.log(data);
            dispatch(addOnlineConvos(data.onlineConvoIds));
        }
        const setOfflineConvosFn = (data: { onlineConvoIds: string[] }) =>{
            console.log(data);
            dispatch(removeOnlineConvos(data.onlineConvoIds));
        }

        if (!isAuthenticated) return;
        if (!socket) return;

        socket.on('message-receive', messageHandler);
        socket.on('online-friends', setOnlineConvosFn);
        socket.on('offline-friends', setOfflineConvosFn);
        
        return () => {
            socket.off('message-receive', messageHandler);
            socket.off('online-friends', setOnlineConvosFn);
            socket.off('offline-friends', setOfflineConvosFn);
        };
    }, [isAuthenticated, socket, dispatch, conversations, axiosSecure])
    

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
