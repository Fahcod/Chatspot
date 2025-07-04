import mongoose, { Schema } from "mongoose";

const groupSchema = new mongoose.Schema({
    name:{type:String,required:true},
    admin:{type:Schema.Types.ObjectId,required:true},
    description:{type:String,required:true},
    icon:{type:String,default:""},
    members:[{type:Schema.Types.ObjectId,ref:"users"}],
    is_user:{type:Boolean,default:false},
    is_active:{type:Boolean,default:false}
},{minimize:false,timestamps:true});

const groupModel = mongoose.models.groups || mongoose.model("groups",groupSchema);

export default groupModel