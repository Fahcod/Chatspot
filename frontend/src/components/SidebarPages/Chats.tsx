import {BiMenu, BiSearch} from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat } from "../../slices/chatSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLastChatMessage, getRealTime, getUnreadMessages } from "../../utils/messages";
import { setShowSideBar } from "../../slices/sidebarSlice";
import Stories from "../Stories";
import EmptyList from "./EmptyList";

const Chats = () => {

  const chatsList:User[] = useSelector((state:any)=>state.users.all_chats);
  const onlineUsers:string[] = useSelector((state:any)=>state.chat.online_users);
  const messages:Message[] = useSelector((state:any)=>state.chat.all_messages);
  const [chats,setResults]=useState<User[]>(chatsList);
  const dispatch = useDispatch();
  //the search term
  const [searchTerm,setSearchTerm]=useState("");
  const navigate = useNavigate()
  //the function to handle contact onPress
  function handleClick(props:any){
    dispatch(setActiveChat({
      _id:props._id,
      username:props.username,
      profile_pic:props.profile_pic,
      is_user:props.is_user,
      updatedAt:props.updatedAt
    }));
    navigate("/home/chat");
    dispatch(setShowSideBar(true));
  }

  useEffect(()=>{
  setResults(chatsList);
  let items = chatsList.filter((item:User)=>{
    return item.username.toLowerCase().indexOf(searchTerm.toLocaleLowerCase())>-1
  });
  console.log(chats)
  setResults(items);
  },[searchTerm]);

  return (
    <div className="w-full h-full">
    {/* the header */}
    <div className="w-full flex items-center justify-between py-4">
    <h2 className="font-[rubik-bold] text-[#222] text-xl">Chats</h2>
    <BiMenu className="w-8 h-8"/>
    </div>
    {/* the search box */}
    <div className="w-full flex px-2 justify-between items-center bg-[#efefef] h-[41px] rounded-3xl mt-2">
    <BiSearch className="w-5 h-5 text-[#454545]"/>
    <input type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="search chats" className="outline-none bg-transparent w-[88%]" />
    </div>
    {/* the stories */}
    <Stories/>
    {/* the chats container */}
    <div className="w-full flex flex-col gap-6 pt-7">
    {chatsList.length>0?chatsList.map((item:User,index:number)=>{
      const unseenMessages:number = getUnreadMessages(messages,item._id);
      const lastMessage:string[] = getLastChatMessage(messages,item._id).slice(0,40)
      return(
        <div className="w-full cursor-pointer flex justify-between" key={index} onClick={()=>handleClick(item)}>
         <div className="flex items-center gap-3">
         <div>
          <img src={item.profile_pic} className="w-[42px] h-[42px] rounded-full object-cover"/>
         </div>
         <div>
          <h2 className="leading-none text-[#222] font-semibold font-[rubik-light]">{item.username}</h2>
          {onlineUsers.includes(item._id)?<p className="text-sm text-green-500">online</p>:<p className="text-sm text-[#555]">{lastMessage}</p>}
         </div>
         </div>
        <div className="flex flex-col items-center">
        <p className="text-xs text-[#454545]">{getRealTime(item.updatedAt)}</p>
        {unseenMessages>0?<p className=" bg-[#7e47e5] rounded-full px-1 text-white text-xs mt-1 font-[rubik-light]">{unseenMessages}</p>:<></>}
        </div>
        </div>
      )
    }):<EmptyList/>}
    </div>
    </div>
  )
}

export default Chats;
