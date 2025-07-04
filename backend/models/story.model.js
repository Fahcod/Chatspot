import mongoose, { Schema } from "mongoose";


const storySchema = new mongoose.Schema({
owner:{type:Schema.Types.ObjectId,ref:'users'},
story_value:{type:String},
story_text:{type:String},
story_type:{type:String,required:true},
story_background:{type:String},
views:{type:Array,default:[]}
},{timestamps:true});

const storyModel = mongoose.models.strories || mongoose.model("stories",storySchema);

export default storyModel;