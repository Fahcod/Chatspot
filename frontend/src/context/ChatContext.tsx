import { createContext, useEffect, useState } from "react";
import { axiosInstance, BACKEND_URL } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../slices/userSlice";
import { setUsers } from "../slices/usersSlice";
import { addMessage,addMessages, setAllMessages, setOnlineUsers } from "../slices/chatSlice";
import {io} from "socket.io-client"
import { playMessageReceived } from "../utils/soundEffects";
import { setGroups } from "../slices/groupSlice";
import { getChatViewImages } from "../utils/imageviewer";
import { setChatViewImages, setNotificatios } from "../slices/servicesSlice";
import { setStories } from "../slices/storySlice";

//get the cached user ID
const SOCKET_CONN=localStorage.getItem('SOCKET_CONN');
//connect the socket
const socket = io(BACKEND_URL,{
    query:{
        client_id:SOCKET_CONN
    },
    autoConnect:true,
});

export const ChatContext = createContext<any>(null);

const ChatContextProvider = (props:any)=>{

    const dispatch = useDispatch();
    //store the image to be sent
    const [imageMessage,setImageMessage]=useState("");
    const activeChat = useSelector((state:any)=>state.chat.active_chat);
    const messages:Array<Message> = useSelector((state:any)=>state.chat.all_messages);
    const userData:User = useSelector((state:any)=>state.user);

    //the api calls
    const fetchUser = async ()=>{
        let response = await axiosInstance.get('/api/v1/user/get');
        if(response.status === 200){
        dispatch(setUserData(response.data.data));
        dispatch(setGroups(response.data.groups))
        }else{
            console.error(response.statusText)
        }
    }
    //fetch all the users
    const fetchAllUsers = async ()=>{
        let response = await axiosInstance.get('/api/v1/user/get-all');
        if(response.status === 200){
        dispatch(setUsers(response.data.data))
        }else{
            console.error(response.statusText)
        }
    }
    //fetch the chat messages
    const getChatMessages = async ()=>{
        let response = await axiosInstance.get(`/api/v1/messages/get-chats/${activeChat._id}`);
        if(response.status === 200){
        dispatch(addMessages(response.data.data))
        }else{
            console.error(response.data.message)
        }
    }
    //fetch the user messages
    const getAllMessages = async ()=>{
        let response = await axiosInstance.get(`/api/v1/messages/get-all`);
        if(response.status === 200){
        dispatch(setAllMessages(response.data.data))
        }else{
            console.error(response.data.message)
        }
    }
    //fetch all the user's notifications
    const fetchNotifications = async ()=>{
        let response = await axiosInstance.get(`/api/v1/notify/get/${userData._id}`);
        if(response.status === 200){
        dispatch(setNotificatios(response.data.data))
        }else{
        console.error(response.statusText)
        }
    }

    //fetch the groups
    const getAllGroups = async ()=>{
        let response = await axiosInstance.get(`/api/v1/groups/get`);
        if(response.status === 200){
        dispatch(setGroups(response.data.data));
        }else{
            console.error(response.data.message)
        }
    }

     //fetch the chat messages
    const getGroupMessages = async ()=>{
        let response = await axiosInstance.get(`/api/v1/messages/get-group-messages/${activeChat._id}`);
        if(response.status === 200){
        dispatch(addMessages(response.data.data))
        }else{
            console.error(response.data.message)
        }
    }

    //update seen messages
    const updateSeenMessages = async ()=>{
    let response = await axiosInstance.put('/api/v1/messages/update-seen',{
    chat_id:activeChat._id
    });
    if (response.status === 201){
     getAllMessages();
    }else{
        console.error(response.data.message)
    }
    }

    //get the stories
    const fetchStories = async ()=>{
        let response = await axiosInstance.get(`/api/v1/stories/get`);
        if(response.status === 200){
        dispatch(setStories(response.data.data))
        }else{
            console.error(response.data.message)
        }
    }

    //settting the view images
    function setViewImages () {
    const imageData = getChatViewImages(messages,userData._id,activeChat._id);
    dispatch(setChatViewImages(imageData))
    }

    //----------------THE SOCKET FUNCTIONS AND METHODS--------------//
    useEffect(()=>{
     //when a new message has been received
    socket.on("new_message",(data)=>{
    dispatch(addMessage(data));
    playMessageReceived()
    });
    //when the online users are emited
    socket.on("online_users",(data)=>{
    dispatch(setOnlineUsers(data));
    });
    //when there is a new notification
    socket.on("new_notify",(data)=>{
        alert("You have a new notification");
        console.log({noti:data})
    })
    },[socket])

    //function to join a user to a group
    async function joinGroup(groupID:string){
    await socket.emit("join_group",{room:groupID})
    }

    //hook to run when the active chat changes
    useEffect(()=>{
    //if the active chat is a user,fetch user messages
    //but if not, fetch group messages
    if(activeChat.is_user){
        getChatMessages();
        updateSeenMessages();
    }else if (activeChat._id !== ''){
        getGroupMessages()
    }
    },[activeChat]);

    //fetch from all API endpoints
    useEffect(()=>{
       fetchUser();
       fetchAllUsers();
       getAllMessages();
       getAllGroups();
       fetchStories();
       fetchNotifications()
    },[]);
    
    const context_value={
    socket,
    imageMessage,
    setImageMessage,
    joinGroup,
    getAllGroups,
    fetchUser,
    setViewImages
    }

    return(
        <ChatContext.Provider value={context_value}>
            {props.children}
        </ChatContext.Provider>
    )

}

export default ChatContextProvider;