import React from 'react'
import { useSocket } from '../Contects/SocketProvider';

export default function RoomSelection({data}) {
    const socket = useSocket();

    function createRoom() {
        socket.emit("createRoom")
    }

    function joinRoom(e) {
        e.preventDefault();
        socket.emit('joinRoom', e.target.id.value)
    }



    return (
        <div>
            <h1>Welcome {data.name}</h1>
            <h3>Enter room id:</h3>
            <form onSubmit={joinRoom}>
                <input name="id" type="text"/>
                <div>
                    <button>Enter room</button>
                    <button onClick={createRoom}>Create room</button>
                </div>
            </form>   
        </div>
    )
}
