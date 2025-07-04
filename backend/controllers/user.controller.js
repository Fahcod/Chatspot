import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";
import { cloudinary } from "../config/cloudinary.js";

//create the token
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}

//CREATE THE USER ACCOUNT
const signupUser = async (req,res)=>{
try {
//get the form data
const {
fullname,
username,
email,
country_code,
phone,
password}=req.body;
//validate the data
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(422).json({success:false,message:"Please fill all fields correctly"})
}
//check if user exists already
let userCheck = await userModel.findOne({email:email});
if(userCheck){
    return res.json({success:false,message:"This email is already taken"})
}
//hash the password
const salt = await bcrypt.genSalt(10);
const hashedPassword=await bcrypt.hash(password,salt);
//join the country code and the phone number
const fullPhone = `${country_code}${phone}`
//create the user
let newUser = new userModel({
    fullname:fullname,
    username:username,
    email:email,
    phone:fullPhone,
    password:hashedPassword,
});
//save the user
let user = await newUser.save();
//create the token
const token = createToken(user._id);
//set the cookie
res.cookie('chtspt',token,{httpOnly:true,secure:true,sameSite:'None',maxAge:1000 * 60 * 60 * 24 * 30});
res.status(201).json({success:true,userID:user._id,message:"Account created successfully"})
} catch (error) {
console.log(error);
res.status(500).json({message:"An error occured"});
}
}

//LOGIN THE USER
const loginUser = async (req,res)=>{
    try {
    //get the data
    const {email,country_code,phone,password}=req.body;
    //validate the data
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({success:false,message:"Please fill all fields correctly"}) 
    }
    //find the user
    let user = await userModel.findOne({email:email});
    if(!user){
        res.status(404).json({success:false,message:"User not found"})
    }
    //join the country code and the phone number
    const fullPhone = `${country_code}${phone}`
    //check the phone numbers
    //  if(fullPhone !== user.phone){
    //     return res.status(404).json({success:false,message:"This is a wrong phone number"})
    // }
    //compare the passwords
    const passCompare = await bcrypt.compare(password,user.password);
    if(!passCompare){
        return res.status(401).json({message:"This password is wrong"})
    }
    //if everything id okay create the token
    const token = createToken(user._id);
    //set the cookie
    res.cookie('chtspt',token,{httpOnly:true,secure:true,sameSite:'None',maxAge:1000 * 60 * 60 * 24 * 30});
    res.status(200).json({success:true,userID:user._id,message:"Logged in successfully"})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"An error occured"});
    }
}


//GET THE USER
const fetchUser = async (req,res)=>{
    try {
    //get the user id
    const {user_id} = req.body;
    //fetch the user
    let result = await userModel.findById(user_id);
    //if not user
    if(!result){
        return res.status(404).json({message:"User not found"})
    }
    res.status(200).json({success:true,data:result});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"An error occured"});
    }
}

//GET ALL USERS
const fetchAllUsers = async (req,res)=>{
try {
   //get the user id
    const {user_id} = req.body;
   //fetch all users
    let result = await userModel.find().select("-password");
    //return the result
    const usersArray = result.filter((item)=>{
        return item._id != user_id
    })
    res.status(200).json({data:usersArray})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"An error occured"});
}
}

//UPDATE THE USER PROFILE
const updateProfile = async (req,res)=>{
    try {
    //get the fields
    const {user_id,username,user_bio}=req.body;
    //function to call for update
    async function update(image_URL){
    //update the user
    await userModel.updateOne({_id:user_id},{$set:{profile_bio:user_bio,profile_pic:image_URL,username:username}})
    res.status(201).json({message:"Profile updated successsfully"})
    }

    //upload the image to cloudinary
    cloudinary.uploader.upload(req.file.path,(err,result)=>{
        if (err) {
            return res.status(500).json({message:"Error uploading image"})
        }
        //update the user profile
        update(result.secure_url);
    });
    
    } catch (error) {
    console.log(error);
    res.json({success:false,message:"An error occured"});  
    }
}

//update the user connection status
const updateConnectionStatus = async (state,user_id)=>{
//this run whenever the user gets connected and when the user goes offline
try {
//find the user and update
if(state === 'connected'){
 await userModel.updateOne({_id:user_id},{$set:{is_online:true}});
}else{
 await userModel.updateOne({_id:user_id},{$set:{is_online:false}});
}
//
} catch (error) {
    console.log(error)
}
}

export {signupUser,loginUser,fetchUser,fetchAllUsers,updateProfile,updateConnectionStatus}