import { useEffect, useState } from "react";
import { BiBlock, BiEnvelope, BiGroup, BiMicrophone, BiPhone, BiTrash, BiUser, BiUserPlus, BiUserX, BiVideo, BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setShowContactInfo } from "../slices/sidebarSlice";
import { setShowAddGroupMembers } from "../slices/modalSlice";


const ChatInfo = () => {

    //the data to be displayed
    const [chatInfo,setChatInfo]=useState<User>();
    const [groupInfo,setGroupInfo]=useState<Group>();
    //get the groups and users
    const chatData:any = useSelector((state:any)=>state.chat.active_chat);
    const dispatch = useDispatch();
    const allGroups:Group[] = useSelector((state:any)=>state.groups.groups);
    const allUsers:User[] = useSelector((state:any)=>state.users.all_chats);

    //the variable to show the rightbar
    const isShow:boolean = useSelector((state:any)=>state.sidebar.show_contact_info);

    //get user info if the active chat is a user
    function getUserInfo(userId:string):void{
    try {
    let exact_user:User[] = allUsers.filter((item:User)=>{
    return item._id == userId
    });
    setChatInfo(exact_user[0])
    } catch (error) {
        console.error(error)
    }
    }

    //get group info if active chat is a group
    function getGroupInfo(groupId:string):void{
      try {
    let exact_group:Group[] = allGroups.filter((item:Group)=>{
    return item._id == groupId
    });
    setGroupInfo(exact_group[0]);
    } catch (error) {
        console.error(error)
    }
    }

    //the hook to run whenever the active chat changes
    useEffect(()=>{
    if(chatData.is_user){
        getUserInfo(chatData._id)
    }else{
        getGroupInfo(chatData._id)
    }
    },[chatData]);
    
  return (
    <div className={`w-full sm:w-[25%] ${isShow?'translate-x-0':'translate-x-100'} duration-500 overflow-y-auto pb-16 [&::-webkit-scrollbar]:w-0 bg-white h-screen fixed right-0 border-solid border-[1px] border-gray-200`}>
      {/* the header */}
      <div className="w-full h-[60px] flex items-center justify-between px-4">
      <h2 className="font-[rubik-bold] text-lg">{chatData.is_user?"Contact info":"Group info"}</h2>
      <div className="bg-[#efefef] rounded-full p-[3px] cursor-pointer">
      <BiX className="w-6 h-6" onClick={()=>dispatch(setShowContactInfo(false))}/>
      </div>
      </div>
      {/* profile information */}
      <div className="w-full">
        <div className="w-full flex justify-center">
        <div className="flex flex-col items-center">
        <img src={chatData?.profile_pic} className="w-[150px] h-[150px] rounded-full object-cover"/>
        <p className="font-[rubik-bold] pt-2 text-center">{chatData?.username}</p>
        <p className="text-center leading-none text-sm font-[rubik-light]">{chatData.is_user?chatInfo?.profile_bio:groupInfo?.description}</p>
        </div>
        </div>
      </div>
      <hr className="mt-3 outline-none h-[1px] border-gray-200 mx-4"/>
      {/* the start call section */}
      <div className="w-full flex py-5 justify-center flex-row items-center gap-4">
      <button className="flex items-center gap-2 px-5 py-2 bg-[#efefef] rounded-md cursor-pointer">
      <BiVideo className="w-5 h-5"/>
      <p className="font-[rubik-light]">Video</p>
      </button>
      <button className="flex items-center gap-2 px-5 py-2 bg-[#efefef] rounded-md cursor-pointer">
      <BiMicrophone className="w-5 h-5"/>
       <p className="font-[rubik-light]">Audio</p>
      </button>
      </div>
      {chatData.is_user?<hr className="mt-3 outline-none h-[1px] border-gray-200 mx-4"/>:<></>}
      {/* the contact options for users*/}
      {chatData.is_user?<div className="w-full flex flex-col font-[rubik-light] gap-5 px-4 py-4">
      <div className="flex items-center gap-3">
      <BiUser className="w-5 h-5"/>
      <p className="text-sm">Name</p>
      <p className="text-sm">{chatInfo?.fullname}</p>
      </div>
      <div className="flex items-center gap-3">
      <BiEnvelope className="w-5 h-5"/>
      <p className="text-sm">Email</p>
      <p className="text-sm">{chatInfo?.email}</p>
      </div>
      <div className="flex items-center gap-3">
      <BiPhone className="w-5 h-5"/>
      <p className="text-sm">Phone</p>
      <p className="text-sm">{chatInfo?.phone}</p>
      </div>
      <div className="flex items-center gap-3">
      <BiGroup className="w-5 h-5"/>
      <p className="text-sm">Groups</p>
      <p className="text-sm">3 groups in common</p>
      </div>
      </div>:<></>}
      <hr className="mt-3 outline-none h-[1px] border-gray-200 mx-4"/>
      {/* more contact options for users*/}
      {chatData.is_user?<div className="w-full flex flex-col font-[rubik-light] gap-5 px-4 py-4">
      <div className="flex text-red-500 font-semibold items-center gap-3 cursor-pointer">
      <BiBlock className="w-5 h-5"/>
      <p className="text-sm">Block</p>
      <p className="text-sm">{chatInfo?.fullname}</p>
      </div>
      <div className="flex text-red-500 font-semibold items-center gap-3 cursor-pointer">
      <BiTrash className="w-5 h-5"/>
      <p className="text-sm">Delete this contact</p>
      </div>
      </div>:<></>}
      
      {/* THE OPTIONS FOR THE GROUPS */}
      {!chatData.is_user?<div className="w-full">
      <div className="w-full px-4 py-2">
        <p className="font-[rubik-light] text-md">Members({groupInfo?.members?.length || 0})</p>
        {/* the container for members of the group */}
        <div className="w-full pt-2 flex flex-col gap-5">
        {groupInfo?.members.map((item:User,index:number)=>{
            return(
                <div className="flex flex-row gap-3 cursor-pointer" key={index}>
                <div>
                <img src={item.profile_pic} className="w-[42px] h-[42px] rounded-full object-cover"/>
                </div>
                <div>
                <h2 className="font-semibold">{item.username}</h2>
                <p className="text-sm text-[#454545]">{item.phone}</p>
                </div>
                </div>
            )
        })}
        </div>
      </div>
      <hr className="mt-3 outline-none h-[1px] border-gray-200 mx-4"/>
      </div>:<></>}
      {/* more group options*/}
      {!chatData.is_user?<div className="w-full flex flex-col font-[rubik-light] gap-5 px-4 py-4">
       <div className="flex font-semibold items-center gap-3 cursor-pointer"
       onClick={()=>dispatch(setShowAddGroupMembers(true))}
       >
      <BiUserPlus className="w-6 h-6"/>
      <p className="text-sm">Add a member</p>
      </div>
      <div className="flex text-red-500 font-semibold items-center gap-3 cursor-pointer">
      <BiUserX className="w-6 h-6"/>
      <p className="text-sm">Block this group</p>
      {/* <p className="text-sm">group</p> */}
      </div>
      <div className="flex text-red-500 font-semibold items-center gap-3 cursor-pointer">
      <BiTrash className="w-5 h-5"/>
      <p className="text-sm">Exit this group</p>
      </div>
      <div className="flex text-red-500 font-semibold items-center gap-3 cursor-pointer">
      <BiBlock className="w-5 h-5"/>
      <p className="text-sm">Report this group</p>
      </div>
      </div>:<></>}

    </div>
  )
}

export default ChatInfo;
