const { v4: uuidv4 } = require('uuid');

const rooms = {};

class Room {
    

    constructor(host, id, numPlayers=4, numPoints=30) {
        this.users = []
        this.numPlayers = numPlayers;
        this.numPoints = numPoints;
        this.id = id;
        this.game = null
        host.joinRoom(this)
    }

    isFull() {
        return !(this.users.length < this.numPlayers)
    }

    playerJoin(user) {
        this.users.push(user);  
        this.sendPlayersInRoom();
    }


    playerLeave(user) {
        this.users = this.users.filter(theUser => theUser.id !== user.id);  
        this.SendToRoom(user, "usersInRoom", JSON.stringify(this.getPlayers()))
        user.socket.emit("usersInRoom", JSON.stringify([])) 
    }

    SendToAllInRomm(event, data) {
        console.log(`sent ${event} all`)
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].connected) {
                this.users[i].socket.emit(event, data);
            }
        }
    }

    SendToRoom(user, event, data) {
        for (let i = 0; i < this.users.length; i++) {
            if (user !== this.users[i] && this.users[i].connected) {
                this.users[i].socket.emit(event, data);
            }
        }
    }

    sendPlayersInRoom() {
        this.SendToAllInRomm("usersInRoom", JSON.stringify(this.getPlayers()))
    }

    getPlayers() {
        return this.users.map(user => {return {id:user.id, name:user.name, connected:user.connected}})
    }

    getGameState() {
        if (!this.game) {
            return { state:"room-loby", data:{roomId:this.id} }
        }
    }

    startGame() {

    }
    
}

function createRoom(user) {
    const roomId = uuidv4();
    const newRoom = new Room(user, roomId);
    rooms[roomId] = newRoom;
}

function getRoom(id) {
    return rooms[id]
}

module.exports = {
    Room,
    createRoom,
    getRoom
};

