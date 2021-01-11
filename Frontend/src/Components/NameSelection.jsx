import React from 'react'
import { useSocket } from '../Contects/SocketProvider';

export default function NameSelection() {
    const socket = useSocket();
  
    function handleSubmit(e) {
        e.preventDefault();
        //const data = {name: e.target.name.value}
        socket.emit('changeName', e.target.name.value)
    }

    return (
        <div>
            <h1>Enter a name:</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" type="text"/>
                <button>Enter name</button>
            </form>   
        </div>
    )
}
