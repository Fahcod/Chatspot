import messageModel from "../models/message.model.js";
import { io,getUserSocket } from "../lib/socket.js";
import { cloudinary } from "../config/cloudinary.js";


//SEND A ONE TO ONE TEXT MESSAGE
const sendTextMessage = async (req,res)=>{
    try {
    //get the credentials
    const {user_id,receiver,text,sender_username,sender_profile}=req.body;
    //validate some data
    if(text === ''){
        return res.status(422).json({message:"Please the message is empty"})
    }
    //create the message
    const newMessage = new messageModel({
        sender:user_id,
        receiver:receiver,
        text:text,
        message_type:'text'
    });
    //save the message
    let messData = await newMessage.save();
    //check and send the message to the user
    const userSocketId = getUserSocket(receiver);
    //create a message to return to the user
    let messageObj={
    _id:messData._id,
    sender:{
    _id:messData.sender,
    username:sender_username,
    profile_pic:sender_profile
    },
    text:messData.text,
    image:"",
    receiver:messData.receiver,
    message_type:messData.message_type,
    seen:messData.seen,
    createdAt:messData.createdAt,
    updatedAt:messData.updatedAt
    }
    //if the user is online, send the message
    if(userSocketId){
     io.to(userSocketId).emit("new_message",messageObj)
    }
    //return the response to the user
    res.status(200).json({message:messageObj})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"An error occured"})
    }
}

//SEND A ONE TO ONE IMAGE MESSAGE
const sendImageMessage = async (req,res)=>{
    try {
    //get the credentials
    const {user_id,receiver,text,sender_profile,sender_username}=req.body;

    //the function to create the message
    async function createMessage(image_url){
    //create the message
    const newMessage = new messageModel({
        sender:user_id,
        receiver:receiver,
        text:text,
        image:image_url,
        message_type:'image'
    });
    //save the message
    let messData = await newMessage.save();
    //create a message to return to the user
    let messageObj={
    _id:messData._id,
    sender:{
    _id:user_id,
    username:sender_username,
    profile_pic:sender_profile
    },
    text:messData.text,
    image:messData.image,
    receiver:messData.receiver,
    message_type:messData.message_type,
    seen:messData.seen,
    createdAt:messData.createdAt,
    updatedAt:messData.updatedAt
    }
    //check and send the message to the user
    const userSocketId = getUserSocket(receiver);
    //if the user is online, send the message
    if(userSocketId){
     io.to(userSocketId).emit("new_message",messageObj);
    }
    //return the response to the user
    res.status(200).json({message:messageObj})
    }
   
    //upload the image to cloudinary
    cloudinary.uploader.upload(req.file.path,(err,result)=>{
        if (err) {
            return res.status(500).json({message:"Error uploading image"})
        }
        //create and save the message
        createMessage(result.secure_url);
    })
    
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"An error occured"})
    }
}

//GET CHAT MESSAGES
const getChatMessages = async (req,res)=>{
    try {
    //get the user id and the other chat id
    const {user_id}=req.body;
    const {chatId} = req.params;
    //fetch their messages
    let messages = await messageModel.find({$or:[
        {sender:user_id,receiver:chatId},{sender:chatId,receiver:user_id}
    ]}).populate("sender","username profile_pic");
    //return the messages
    res.status(200).json({data:messages})
    } catch (error) {
       console.log(error);
       res.status(500).json({message:"An error occured"}) 
    }
}

//GET ALL USER MESSAGES
//this will return all the user messages
const getUserMessages = async (req,res)=>{
    try {
    const {user_id}=req.body;
    //find all the user's messages
    let result = await messageModel.find({$or:[
        {sender:user_id},{receiver:user_id}
    ]}).populate("sender","username profile_pic");
    //return the messages
    res.status(200).json({data:result});
    } catch (error) {
      console.log(error);
    res.status(500).json({message:"An error occured"})  
    }
}

/********************************************************************/
//THE HANDLERS FOR SENDING GROUP MESSAGES

//send a group text message
const sendGroupMessage = async (req,res)=>{
    try {
   //get the credentials
    const {user_id,receiver,text,sender_username,sender_profile}=req.body;
    //create the message
    const newMessage = new messageModel({
        sender:user_id,
        receiver:receiver,
        text:text,
        message_type:'text'
    });
    //save the message
    let messData = await newMessage.save();
    //create a message to return to the user
    let messageObj={
    _id:messData._id,
    sender:{
    _id:messData.sender,
    username:sender_username,
    profile_pic:sender_profile
    },
    text:messData.text,
    image:"",
    receiver:messData.receiver,
    message_type:messData.message_type,
    seen:messData.seen,
    createdAt:messData.createdAt,
    updatedAt:messData.updatedAt
    }
    //send the message to the specified group(room) except the sender
    const senderSocket = getUserSocket(user_id);
    //by using the reciceiver id which is the group id
    io.to(receiver).except(senderSocket).emit("new_message",messageObj);
    //return the response to the user
    res.status(200).json({message:messageObj})
    } catch (error) {
    console.log(error);
    res.status(500).json({message:"An error occured"})
    }
}

//get group messages
const getGroupMessages = async (req,res)=>{
    try {
    //get the user data and the groupId
    const group_id = req.params.groupId
    //fetch the messages
    let result = await messageModel.find({receiver:group_id}).populate("sender","profile_pic username");
    res.status(200).json({data:result});

    } catch (error) {
    console.log(error);
    res.status(500).json({message:"An error occured"})  
    }
}

//SEND A GROUP IMAGE MESSAGE
const GroupImageMessage = async (req,res)=>{
    try {
    //get the credentials
    const {user_id,receiver,text,sender_profile,sender_username}=req.body;
    //the function to create the message
    async function create_message(image_url){
    //create the message
    const newMessage = new messageModel({
        sender:user_id,
        receiver:receiver,
        text:text,
        image:image_url,
        message_type:'image'
    });
    //save the message
    let messData = await newMessage.save();
    //create a message to return to the user
    let messageObj={
    _id:messData._id,
    sender:{
    _id:messData.sender,
    username:sender_username,
    profile_pic:sender_profile
    },
    text:messData.text,
    image:messData.image,
    receiver:messData.receiver,
    message_type:messData.message_type,
    seen:messData.seen,
    createdAt:messData.createdAt,
    updatedAt:messData.updatedAt
    }
    //send the message to the group except the sender
    const userSocket = getUserSocket(user_id)
     io.to(receiver).except(userSocket).emit("new_message",messageObj);
    //return the response to the user
    res.status(200).json({message:messageObj})
    }

     //upload the image to cloudinary
    cloudinary.uploader.upload(req.file.path,(err,result)=>{
        if (err) {
            return res.status(500).json({message:"Error uploading image"})
        }
        //create and save the message
        create_message(result.secure_url);
    })
    
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"An error occured"})
    }
}

//update the seen messages
const updateSeenMessages = async (req,res)=>{
    try {
    //get the user id and the chat id
    const {user_id,chat_id} = req.body;
    await messageModel.updateMany({sender:chat_id,receiver:user_id},{$set:{seen:true}});
    res.status(201).json({message:"Messages updated"})
    } catch (error) {
       console.log(error);
       res.status(500).json({message:"An error occured"}) 
    }
}



export {updateSeenMessages,GroupImageMessage,sendImageMessage,sendTextMessage,getChatMessages,getUserMessages,sendGroupMessage,getGroupMessages}