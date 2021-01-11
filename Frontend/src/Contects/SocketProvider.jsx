import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client';
import useLocalStorage from '../Hooks/useLocalStorage';

const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
}

export function SocketProvider({ children }) {
    const [socket, setSocket] = useState();
    const id = useLocalStorage("id")[0];

    useEffect(() => {
        const newSocket = io(
            'http://localhost:4000', 
            { query: {id: id} }
        );
        setSocket(newSocket);

        return () => newSocket.close()

    }, [id])

    return (
        <SocketContext.Provider value={socket}>
            { children }
        </SocketContext.Provider>
    )
}
