import mongoose, { Schema } from "mongoose";

//the notification schema and model
const NotificationSchema = new mongoose.Schema({
    from:{type:Schema.Types.ObjectId,required:true,ref:"users"},
    to:{type:Schema.Types.ObjectId,required:true},
    text:{type:String,required:true},
    notify_type:{type:String,required:true},
    seen:{type:Boolean,default:false}
},{timestamps:true});

const NotificationModel = mongoose.models.notifications || mongoose.model("notifications",NotificationSchema);

export default NotificationModel