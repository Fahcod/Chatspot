import {createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:"user",
    initialState:{
    _id:"",
    fullname:"",
    username:"",
    email:"",
    profile_pic:"",
     profile_bio:""
    },
    reducers:{
    setUserData:(state,action)=>{
        state._id=action.payload._id
        state.fullname = action.payload.fullname;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.profile_pic = action.payload.profile_pic,
        state.profile_bio = action.payload.profile_bio
    }
    }
});

export const {setUserData} = userSlice.actions;
export default userSlice.reducer