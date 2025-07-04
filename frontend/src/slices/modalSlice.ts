import {createSlice} from "@reduxjs/toolkit";


const modalSlice = createSlice({
    name:"modals",
    initialState:{
    show_update_profile:false,
    show_send_image:false,
    show_create_group:false,
    show_add_members:false,
    show_image_viewer:false
    },
    reducers:{
    setShowUpdateProfile:(state,action)=>{
        state.show_update_profile=action.payload
    },
    setShowSendImage:(state,action)=>{
        state.show_send_image=action.payload
    },
    setShowCreateGroup:(state,action)=>{
        state.show_create_group = action.payload
    },
    setShowAddGroupMembers:(state,action)=>{
        state.show_add_members = action.payload
    },
    setShowImageViewer:(state,action)=>{
        state.show_image_viewer = action.payload
    }
    }
});

export const {setShowUpdateProfile,
    setShowSendImage,
    setShowCreateGroup,
    setShowAddGroupMembers,
    setShowImageViewer
} = modalSlice.actions;
export default modalSlice.reducer