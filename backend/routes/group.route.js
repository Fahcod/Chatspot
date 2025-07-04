import express from "express";
import { uploader } from "../lib/multer.js";
import { tokenParser } from "../middleware/auth.js";
import { addGroupMember, createGroup, getUserGroups } from "../controllers/group.controller.js";

const groupRouter = express.Router();

groupRouter.post('/create',uploader.single("image"),tokenParser,createGroup);
groupRouter.put('/add-member/:groupId/:memberId',tokenParser,addGroupMember);
groupRouter.get('/get',tokenParser,getUserGroups);

export default groupRouter;