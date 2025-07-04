import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { app,server } from "./lib/socket.js";
import userRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";
import groupRouter from "./routes/group.route.js";
import storyRouter from "./routes/story.route.js";
import notificationRouter from "./routes/notify.route.js";

const PORT = process.env.PORT;

const version='v1';

app.use(express.json());
app.use(cookieParser())
//enable cross origin reqs
app.use(cors({
origin:['http://localhost:5173'],
methods:["POST","GET","PUT","DELETE"],
credentials:true
}));

//connect the DB
connectDB();

//add the APIs
app.use(`/api/${version}/user`,userRouter);
app.use('/images',express.static("uploads"));
app.use(`/api/${version}/messages`,messageRouter);
app.use(`/api/${version}/groups`,groupRouter);
app.use(`/api/${version}/stories`,storyRouter);
app.use(`/api/${version}/notify`,notificationRouter)

server.listen(PORT,()=>{
    console.log(`The server is running on port: ${PORT}`)
})