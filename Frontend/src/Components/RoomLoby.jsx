import React from 'react'
import { useSocket } from '../Contects/SocketProvider';
import PlayerList from './PlayerList';

export default function RoomLoby({data}) {
    const socket = useSocket();
  
    function handleLeave(e) {
        socket.emit('leaveRoom')
    }

    if (!data) { return }

    return (
        <div>
            <h1>Room ID: {data.roomId}</h1>
                <PlayerList/>
            <button onClick={handleLeave}>Leave room</button>
        </div>
    )
}
