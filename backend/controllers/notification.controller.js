import NotificationModel from '../models/notification.model.js';
import {io,getUserSocket} from '../lib/socket.js'

//SENDING A NOTIFICATION
const sendNotification = async (from,to,text,notify_type)=>{
try {
//create a new notification
let newNotification = new NotificationModel({
    from:from,
    to:to,
    text:text,
    notify_type:notify_type
});
//save the notification
let SavedObj = await newNotification.save();
//send the socket to the user
const userSocketId = getUserSocket(to);
if(userSocketId){
io.to(userSocketId).emit("new_notify",SavedObj)
}
} catch (error) {
    throw error
}
}

//fetch user notifications
const fetchUserNotifications = async (req,res)=>{
    try {
    //get the user id
    const {userId} = req.params
    //fetch user's the notifications
    let result = await NotificationModel.find({to:userId}).populate("from","username profile_pic");
    res.status(200).json({data:result}) 
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"An error occured"})
    }
}

export {sendNotification,fetchUserNotifications}