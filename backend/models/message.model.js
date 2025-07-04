import mongoose, { Schema } from "mongoose";

//the message schema
const messageSchema = new mongoose.Schema({
    sender:{type:Schema.Types.ObjectId,required:true,ref:"users"},
    receiver:{type:Schema.Types.ObjectId,required:true},
    text:{type:String,default:""},
    image:{type:String,defaul:""},
    message_type:{type:String,required:true},
    seen:{type:Boolean,default:false}
},{minimize:false,timestamps:true});

const messageModel = mongoose.models.messages || mongoose.model("messages",messageSchema);

export default messageModel;
