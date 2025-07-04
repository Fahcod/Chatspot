import express from "express";
import { fetchUserNotifications } from "../controllers/notification.controller.js";

const notificationRouter = express.Router();

notificationRouter.get('/get/:userId',fetchUserNotifications);

export default notificationRouter;