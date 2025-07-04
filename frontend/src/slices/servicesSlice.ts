import {createSlice} from "@reduxjs/toolkit";


const servicesSlice = createSlice({
    name:"services",
    initialState:{
    view_image:null,
    chat_view_images:[],
    notifications:[]
    },
    reducers:{
    setViewImage:(state,action)=>{
        state.view_image = action.payload
    },
    setChatViewImages:(state,action)=>{
        state.chat_view_images = action.payload
    },
    setNotificatios:(state,action)=>{
        state.notifications = action.payload
    },
    addNotification:(state:any,action)=>{
        state.notifications.push(action.payload)
    }
    }
});

export const {setViewImage,setChatViewImages,setNotificatios,addNotification} = servicesSlice.actions;
export default servicesSlice.reducer