import {createSlice} from "@reduxjs/toolkit";


const sidebarSlice = createSlice({
    name:"sidebar",
    initialState:{
    active_component:"Chats",
    show_contact_info:false,
    show_sidebar:false
    },
    reducers:{
     setActiveComponent:(state,action)=>{
        state.active_component=action.payload
     },
     setShowContactInfo:(state,action)=>{
       state.show_contact_info=action.payload
     },
     setShowSideBar:(state,action)=>{
      state.show_sidebar = action.payload
     }
    }
});

export const {setActiveComponent,setShowContactInfo,setShowSideBar} = sidebarSlice.actions;
export default sidebarSlice.reducer
