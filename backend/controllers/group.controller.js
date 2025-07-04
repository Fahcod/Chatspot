import groupModel from "../models/group.model.js";
import userModel from "../models/user.model.js"
import { sendNotification } from "./notification.controller.js";
import { cloudinary } from "../config/cloudinary.js";

//CREATE A GROUP
const createGroup = async (req,res)=>{
    try {
    //get the data
    const {user_id,name,description} = req.body;
    
    //the function to create the group
    async function create_group(image_url){
    let newGroup = new groupModel({
        name:name,
        admin:user_id,
        icon:image_url,
        description:description,
        members:[user_id]
    });
    //save the group
    let group=await newGroup.save();
    //add the group
    await userModel.updateOne({_id:user_id},{$push:{groups:group._id}});
    res.status(200).json({message:"Group created successfully"})
    }

    //upload the image to cloudinary
    cloudinary.uploader.upload(req.file.path,(err,result)=>{
        if (err) {
            return res.status(500).json({message:"Error uploading image"})
        }
        //create the group
        create_group(result.secure_url)
    })
    
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"An error occured"})
    }
}

//ADD A MEMBER
const addGroupMember = async (req,res)=>{
    try {
    //get the group id and the mumber id
    const {groupId,memberId} = req.params;
    const {user_id}=req.body;
    //find the group
    let group = await groupModel.findById(groupId);
    //get the group members
    let groupMembers = await group.members;
    //check if the member exists already
    let memberCheck = groupMembers.find(e=>e._id == memberId);
    if(memberCheck){
        return res.status(422).json({message:"This member already exists"})
    }
    //if the user is an admin
    const adminCheck = user_id == group.admin;
    if(!adminCheck){
        return res.status(401).json({message:"You are not an admin"})
    }
    //if the user is the admin, add the member
    await groupModel.updateOne({_id:groupId},{$push:{members:memberId}});
    await userModel.updateOne({_id:user_id},{$push:{groups:group._id}});
    //send the new member a notification
    const text=`Hi user, you were added to a new group`; //the notification text
    const notify_type='New Group';
    await sendNotification(user_id,memberId,text,notify_type);
    //return the response to the user
    res.status(201).json({message:"Member added successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"An error occured"})
    }
}

//GET THE USER GROUPS
const getUserGroups = async (req,res)=>{
    try {
    //get the user id
    const {user_id} = req.body;
    //fetch the user first
    let user = await userModel.findById(user_id);
    //extract the user groups
    let userGroupsArray = await user.groups;
    //fetch the groups
    let result = await groupModel.find().populate("members","username profile_pic phone");
    //filter the groups and return only those groups that this user belongs to
    
    res.status(200).json({data:result});

    } catch (error) {
       console.log(error);
        res.status(500).json({message:"An error occured"}) 
    }
}

export {addGroupMember,createGroup,getUserGroups}