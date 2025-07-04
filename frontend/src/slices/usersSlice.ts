import {createSlice} from "@reduxjs/toolkit";


const usersSlice = createSlice({
    name:"users",
    initialState:{
    all_chats:[]
    },
    reducers:{
    setUsers:(state,action)=>{
        state.all_chats = action.payload
    }
    }
});

export const {setUsers} = usersSlice.actions;
export default usersSlice.reducer