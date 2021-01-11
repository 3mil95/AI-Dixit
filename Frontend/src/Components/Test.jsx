import React, { useState, useEffect }  from 'react';
import { useSocket } from '../Contects/SocketProvider';
import RoomSelection from './RoomSelection';

export default function Test() {
    const [users, setUsers] = useState([]);
    const socket = useSocket();
    //const [id, setId] = useState();
  
    
    function handleSubmit(e) {
      e.preventDefault();
      //const data = {name: e.target.name.value}
      socket.emit('changeName', e.target.name.value)
    }
  
    function handelLeave() {
      socket.emit('leaveRoom', "")
    }
  
    useEffect(() => {
      if (socket == null) { return }
      socket.on("id", data => {
        /*data = JSON.parse(data)
        console.table(data);*/
        console.log(data)
      })
  
      socket.on("usersInRoom", data => {
        data = JSON.parse(data)
        console.table(data);
        setUsers(data)
      })
  
      return () => socket.off();
    }, [socket]);



    return (
    <div className="App">
        {users.map(user => <h1 style={{color: (user.connected ? "#000" : "#777")}} >{user.name}</h1>)}
        <form onSubmit={handleSubmit}>
            <input name="name"></input>
            <button value="Submit">enter</button>
        </form>
        <button onClick={handelLeave}>leave</button>
        <RoomSelection/>
    </div>
    )
}
