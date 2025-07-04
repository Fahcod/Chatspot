import storyModel from "../models/story.model.js";

//Function to create a story
const createStory = async (req,res)=>{
try {
//get the data
const {user_id,story_text,story_type,story_value,story_background} = req.body;
//validate the data
if(story_type === "Text" && story_text === ''){
  return res.status(422).json({message:"Please type somthing"})
}
//create the story
let newStory = new storyModel({
owner:user_id,
story_value:story_value,
story_text:story_text,
story_type:story_type,
story_background:story_background
});
//save the story
let story = await newStory.save();
//return the response
res.status(200).json({data:story});
} catch (error) {
    console.log(error);
    res.status(500).json({message:'An error occured'})
}
}

//function to fetch stories
const getStories = async (req,res)=>{
try {
    let result = await storyModel.find().populate("owner","username profile_pic");
    res.status(200).json({data:result})
} catch (error) {
  console.log(error);
  res.status(500).json({message:'An error occured'})
}
}

//function to update a story
const updateStory = async (req,res)=>{

}

//function to delete a story
const deleteStory = async (req,res)=>{

}


export {createStory,getStories,updateStory,deleteStory}