const PORT = process.env.PORT || 4000;
const os = require('os');
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);


const { Room, createRoom, getRoom } = require('./Room');
const { getUser, deletUser } = require('./User');


const io = require('socket.io')(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});

app.use('/static', express.static('public'))
//const room = new Room("hej", 1)


io.on('connection', socket => {
    let id = socket.handshake.query.id;    
    
    
    const user = getUser(id, socket)
    

    socket.on('changeName', (data) => {
        user.setName(data)
    })    

    socket.on('joinRoom', (id) => {
        const room = getRoom(id)
        user.joinRoom(room)
    })

    socket.on('leaveRoom', () => {
        user.leaveRoom()
    })

    socket.on('createRoom', () => {
        createRoom(user)
    })


    socket.on('disconnect', () => {
        console.log(`disconnect ${id}`);
        if (user.isInRoom()) {
            user.disconnectRoom()
        } else {
            deletUser(id)
        }
    })

});

let address = "";
try {
    let networkInterfaces = os.networkInterfaces( );
    address = networkInterfaces['Wi-Fi'][1].address
} catch {
    address = "http://localhost"
}



httpServer.listen(4000, () => {
    console.log(`Server started on ${address}:${PORT}`)
});