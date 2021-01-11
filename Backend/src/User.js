const users = {};

class User {
    constructor(id, socket) {
        this.socket = socket;
        this.id = id;
        this.name = "";
        this.room = null;
        this.connected = true;
        this.sendGameState()
    }

    isInRoom() {
        return (this.room != null)
    }

    setName(name) {
        this.name = name;
        this.sendGameState()
    }

    joinRoom(room) {
        if (this.isInRoom()) { return }
        this.room = room;
        this.sendGameState()
        room.playerJoin(this)
        
    }

    leaveRoom() {
        if (!this.isInRoom()) { return }
        this.room.playerLeave(this);
        this.room = null;
        this.sendGameState()
    }

    reconnectRoom(socket) {
        this.socket = socket;
        this.sendGameState()
        this.connected = true;
        setTimeout(() => {
            this.room.sendPlayersInRoom();
        }, 200);
    }

    disconnectRoom() {
        this.connected = false;
        this.room.sendPlayersInRoom();
    }

    getGameState() {
        if (this.name === "") {
            return { state: "name-selector" }
        }
        if (!this.isInRoom()) {
            console.log(this.name)
            const data = { name: this.name }
            const res = { state: "room-selector", "data": data }
            console.log(res)
            return res
        }
        return this.room.getGameState();
    }
   

    sendGameState() {
        this.socket.emit("gameState", JSON.stringify(this.getGameState()))
    }
}

function getUser(id, socket) {
    let user = users[id];
    if (!user) {
        console.log(`connect ${id}`);
        user = new User(id, socket);
        users[id] = user;
    } else {
        console.log(`reconnect ${id}`);
        user.reconnectRoom(socket)
    }
    return user;
}

function deletUser(id) {
    delete users[id]
}


module.exports = {
    getUser,
    deletUser
};