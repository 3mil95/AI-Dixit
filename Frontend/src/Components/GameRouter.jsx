import React, { useEffect, useState } from 'react'
import { useSocket } from '../Contects/SocketProvider';
import NameSelection from './NameSelection';
import RoomLoby from './RoomLoby';
import RoomSelection from './RoomSelection';

export default function GameRouter() {
    const [state, setState]  = useState()
    const socket = useSocket();

    useEffect(() => {
        if (socket == null) { return }
    
        socket.on("gameState", data => {
            data = JSON.parse(data)
            console.log(data)
            setState(data)
        })

        /*socket.on("usersInRoom", data => {
            data = JSON.parse(data)
            console.table(data)
            //setUsers(data)
        })*/
    
        return () => socket.off();
    }, [socket]);


    function getGameComponent(gameState) {
        switch(gameState) {
            case "name-selector":
                return <NameSelection/>
            case "room-selector":
                return <RoomSelection data={state.data}/>
            case "room-loby":
                return <RoomLoby data={state.data}/>
            default:
                return null
          }
    }

    if (!state) {
        console.log("return")
        return null;
    }

    return (
        <div>
            {getGameComponent(state.state)}
        </div>
    )
}
