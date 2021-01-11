import React, { useState, useEffect }  from 'react';
import { useSocket } from '../Contects/SocketProvider';

export default function PlayerList() {
    const [users, setUsers] = useState([]);
    const socket = useSocket();

    useEffect(() => {
        if (socket == null) { return }
        
        socket.on("usersInRoom", data => {
            data = JSON.parse(data)
            console.table(data)
            setUsers(data)
        })
    
        return () => socket.off();
    }, [socket]);

    return (
        <div>
            <h3>Players:</h3>
            {users.map(user => <h1 style={{color: (user.connected ? "#000" : "#777")}} >{user.name}</h1>)}
        </div>
    )
}
