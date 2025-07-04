import {configureStore} from "@reduxjs/toolkit";
import sidebarSliceReducer from "../slices/sidebarSlice";
import userSliceReducer from "../slices/userSlice";
import usersSliceReducer from "../slices/usersSlice";
import modalSliceReducer from "../slices/modalSlice";
import chatSliceReducer from "../slices/chatSlice";
import groupSliceReducer from "../slices/groupSlice";
import servicesSliceReducer from "../slices/servicesSlice";
import storySliceReducer from "../slices/storySlice"

export const store = configureStore({
    reducer:{
    sidebar:sidebarSliceReducer,
    user:userSliceReducer,
    users:usersSliceReducer,
    modals:modalSliceReducer,
    chat:chatSliceReducer,
    groups:groupSliceReducer,
    services:servicesSliceReducer,
    stories:storySliceReducer
    }
})