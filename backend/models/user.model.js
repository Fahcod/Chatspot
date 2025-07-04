import mongoose, { Schema } from "mongoose";

//the user schema && model
const userSchema = new mongoose.Schema({
    fullname:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:Number,required:true},
    password:{type:String,required:true},
    profile_pic:{type:String,default:"http://localhost/images/"},
    groups:[{type:Schema.Types.ObjectId,ref:"groups"}],
    profile_bio:{type:String,default:"Hi there, I am a proud chatspot user"},
    is_user:{type:Boolean,default:true},
    is_online:{type:Boolean,default:false}
},{timestamps:true});

const userModel = mongoose.models.users || mongoose.model("users",userSchema);

export default userModel