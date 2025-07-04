import express from "express";
import { tokenParser } from "../middleware/auth.js";
import { createStory, getStories } from "../controllers/story.controller.js";

const storyRouter = express.Router();

storyRouter.post('/create',tokenParser,createStory);
storyRouter.get('/get',tokenParser,getStories)

export default storyRouter;