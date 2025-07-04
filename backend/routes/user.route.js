import express from "express";
import {check} from "express-validator";
import { fetchAllUsers, fetchUser, loginUser, signupUser, updateProfile } from "../controllers/user.controller.js";
import { tokenParser } from "../middleware/auth.js";
import {uploader} from "../lib/multer.js"


const userRouter = express.Router();

//validate signup form data
const signupValidation = [
    check('fullname').notEmpty().withMessage("Fullname is required"),
    check('username').notEmpty().withMessage("Username is required"),
    check('email').notEmpty().isEmail().withMessage("Please enter a valid email"),
    check('country_code').notEmpty().withMessage("Country code is required"),
    check('phone').notEmpty().withMessage("Phone number is required"),
    check('password').notEmpty().withMessage("Password is required")
];

//validate login form data
const loginValidation = [
    check('email').notEmpty().isEmail().withMessage("Please enter a valid email"),
    check('country_code').notEmpty().withMessage("Country code is required"),
    check('phone').notEmpty().withMessage("Phone number is required"),
    check('password').notEmpty().withMessage("Password is required")
];

userRouter.post('/signup',signupValidation,signupUser);
userRouter.post('/login',loginValidation,loginUser);
userRouter.get('/get',tokenParser,fetchUser);
userRouter.get('/get-all',tokenParser,fetchAllUsers)
userRouter.put('/update-profile',uploader.single("image"),tokenParser,updateProfile)

export default userRouter;