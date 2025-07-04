import {createSlice} from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name:"chat",
    initialState:{
    active_chat:{
      _id:"",
      username:"No chat",
      profile:""
    },
    messages:[],
    all_messages:[],
    online_users:[],
    },
    reducers:{
     setActiveChat:(state:any,action)=>{
        state.active_chat=action.payload
     },
     addMessage:(state:any,action)=>{
        state.messages.push(action.payload);
     },
     addMessages:(state,action)=>{
      state.messages = action.payload
     },
     setOnlineUsers:(state,action)=>{
      state.online_users = action.payload
     },
     setAllMessages:(state,action)=>{
      state.all_messages=action.payload
     }
    }
});

export const {setActiveChat,setAllMessages,addMessage,addMessages,setOnlineUsers} = chatSlice.actions;
export default chatSlice.reducer
