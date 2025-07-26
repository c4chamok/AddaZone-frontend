import React, { useEffect } from "react";
import { SocketContext, useSocket } from "../socket";
import { useAppSelector } from "../hooks";
import { useDispatch } from "react-redux";
import useAxiosInstance from "@/hooks/axiosHooks";
import { addConversation, addMessage, type conversation, type Message } from "../slices/chatSlice";



const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAppSelector(state => state.auth);
    const { conversations } = useAppSelector(state => state.chat);
    const { axiosSecure } = useAxiosInstance();
    const socket = useSocket();
    const dispatch = useDispatch()


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
                const { data } = (await axiosSecure.get(`chat?chatId=${res.chatId}`)) as { data: {chatInstance: conversation} };
                dispatch(addConversation(data.chatInstance))
                return;
            }
            dispatch(addMessage(res))
        }
        socket.on('message-receive', messageHandler)
        return () => {
            socket.off('message-receive', messageHandler);
        };
    }, [isAuthenticated, socket, dispatch, conversations, axiosSecure])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
