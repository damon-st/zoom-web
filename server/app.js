const express = require("express");
const cors =require("cors")
const app = express();
app.use(cors({
    origin:"*"
}))
const server =require("http").Server(app);

const io = require("socket.io")(server,
    {
        cors: {
          origin: '*',
        }
      })

io.on("connection",(socket)=>{
    console.log("ALGO SE CON ECTO");
    socket.on("join",(data)=>{
        const roonName = data.roomName;
        socket.join(roonName);
        socket.broadcast.emit("new-user",data);
        console.log("USUARIO CONECTADO ",data);
        socket.on("disconnect",()=>{
        socket.broadcast.emit("bye-user",data);
        })
    })
})

const port = 3000;
server.listen(port,()=>{
    console.log("Server running por ", port);
})