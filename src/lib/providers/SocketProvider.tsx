import React, { useEffect, useRef } from "react";
import { SocketContext, useSocket } from "../socket";
import { useAppSelector } from "../hooks";
import { useDispatch } from "react-redux";
import useAxiosInstance from "@/hooks/axiosHooks";
import { addConversation, addMessage, addOnlineConvos, removeOnlineConvos, setTypingUsers, type conversation, type Message } from "../slices/chatSlice";



const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAppSelector(state => state.auth);
    const { conversations } = useAppSelector(state => state.chat);
    const { axiosSecure } = useAxiosInstance();
    const socket = useSocket();
    const dispatch = useDispatch()
    const typingTimeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});
    // console.log(onlineConvoIds);

    useEffect(() => {
        if (isAuthenticated) {
            console.log("connecting");
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
                const { data } = (await axiosSecure.get(`chat/${res.chatId}`)) as { data: { chatInstance: conversation } };
                dispatch(addConversation(data.chatInstance))
                return;
            }
            dispatch(addMessage(res))
        }
        const setOnlineConvosFn = (data: { onlineConvoIds: string[] }) => {
            console.log(data);
            dispatch(addOnlineConvos(data.onlineConvoIds));
        }
        const setOfflineConvosFn = (data: { onlineConvoIds: string[] }) => {
            console.log(data);
            dispatch(removeOnlineConvos(data.onlineConvoIds));
        }

        const userTyping = (data: { chatId: string; userId: string }) => {
            dispatch(setTypingUsers({ chatId: data.chatId, users: [data.userId] }));

            const key = `${data.chatId}-${data.userId}`;
            if (typingTimeoutsRef.current[key]) {
                clearTimeout(typingTimeoutsRef.current[key]);
            }

            typingTimeoutsRef.current[key] = setTimeout(() => {
                dispatch(setTypingUsers({ chatId: data.chatId, users: [] }));
                delete typingTimeoutsRef.current[key];
            }, 1500);
        };

        if (!isAuthenticated) return;
        if (!socket) return;

        socket.on('message-receive', messageHandler);
        socket.on('online-friends', setOnlineConvosFn);
        socket.on('offline-friends', setOfflineConvosFn);
        socket.on('user-typing', userTyping);

        return () => {
            socket.off('message-receive', messageHandler);
            socket.off('online-friends', setOnlineConvosFn);
            socket.off('offline-friends', setOfflineConvosFn);
            socket.off('user-typing', userTyping);
            Object.values(typingTimeoutsRef.current).forEach(clearTimeout);
            typingTimeoutsRef.current = {};
        };
    }, [isAuthenticated, socket, dispatch, conversations, axiosSecure])


    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
