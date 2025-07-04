import http from "http";
import express from "express";
import { Server } from "socket.io";
import { updateConnectionStatus } from "../controllers/user.controller.js";

const app = express();
const server = http.createServer(app);
//setup the socket
const io = new Server(server,{
    cors:{
        origin:['http://localhost:5173'],
        methods:["POST","GET","PUT","DELETE"],
        credentials:true
    }
});

//store for the online users
const onlineUsers={}

//get the user's socket id
const getUserSocket = (user_id)=>{
return onlineUsers[user_id]
}

io.on("connection",(socket)=>{
console.log(`A user connected: ${socket.id}`);
const userId = socket.handshake.query.client_id;
//store the user id in the collection
onlineUsers[userId]=socket.id
io.emit("online_users",Object.keys(onlineUsers));
console.log(Object.keys(onlineUsers));
//update the user connection status
updateConnectionStatus('connected',userId);

//connect a user to a group room
socket.on("join_group",(data)=>{
    socket.join(data.room);
    console.log(`Group:${data.room} was joined by a new user`)
})

socket.on("disconnect",()=>{
    console.log(`A user disconnected: ${socket.id}`);
    delete onlineUsers[userId];
    //emit the array
    io.emit("online_users",Object.keys(onlineUsers));
    console.log(Object.keys(onlineUsers));
    //update the user connection status
    updateConnectionStatus('disconnected',userId)
});

});

export {server,app,io,getUserSocket}