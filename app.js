let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let socketCli = require('socket.io-client')
let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.warn("STARTED")
    socket.on('my message', (msg) => {
        console.warn("finally a message",msg)
        io.emit('my broadcast', `server: asd`);
    });
    
});


server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

const con = socketCli.connect('http://localhost:3000')
setTimeout(()=>{
    console.warn("SEND")
    con.emit('my message',{obj:"test"})
},3000)


