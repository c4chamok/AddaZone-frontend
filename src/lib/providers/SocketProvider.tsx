import React, { useEffect } from "react";
import socket, { SocketContext } from "../socket";
import { useAppSelector } from "../hooks";



const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAppSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            socket.connect();
        }

        return () => {
            socket.disconnect();
        };
    }, [isAuthenticated]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
