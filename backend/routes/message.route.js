import express from "express";
import { tokenParser } from "../middleware/auth.js";
import { getChatMessages, getGroupMessages, getUserMessages, GroupImageMessage, sendGroupMessage, sendImageMessage, sendTextMessage, updateSeenMessages } from "../controllers/message.controller.js";
import { uploader } from "../lib/multer.js";

const messageRouter = express.Router();

//to users
messageRouter.post('/send-text',tokenParser,sendTextMessage);
messageRouter.post('/send-image',uploader.single("image"),tokenParser,sendImageMessage);
messageRouter.get('/get-chats/:chatId',tokenParser,getChatMessages);
messageRouter.get('/get-all',tokenParser,getUserMessages);
messageRouter.put('/update-seen',tokenParser,updateSeenMessages)
//to groups
messageRouter.post('/send-group-text',tokenParser,sendGroupMessage);
messageRouter.get('/get-group-messages/:groupId',tokenParser,getGroupMessages);
messageRouter.post('/send-group-image',uploader.single("image"),tokenParser,GroupImageMessage);

export default messageRouter;