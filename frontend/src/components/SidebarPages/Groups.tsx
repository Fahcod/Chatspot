import {BiMenu, BiPlus, BiSearch} from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setShowCreateGroup } from "../../slices/modalSlice";
import { setActiveChat } from "../../slices/chatSlice";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { setShowSideBar } from "../../slices/sidebarSlice";

const Groups = () => {

  const dispatch = useDispatch();
  const groups:any[] = useSelector((state:any)=>state.groups.groups);
  const {joinGroup}:any = useContext(ChatContext);

  function handlePress(item:any){
  //the function to run when the group item is clicked
    dispatch(setActiveChat({
      _id:item._id,
      username:item.name,
      profile_pic:item.icon,
      is_user:item.is_user
    }));
   //join the user to the group room
   joinGroup(item._id);
   dispatch(setShowSideBar(true))
  }

  return (
    <div className="w-full h-full relative">
    {/* the header */}
    <div className="w-full flex items-center justify-between py-4">
    <h2 className="font-[rubik-bold] text-xl">Groups</h2>
    <BiMenu className="w-8 h-8"/>
    </div>
    {/* the search box */}
    <div className="w-full flex px-2 justify-between items-center bg-[#efefef] h-[41px] rounded-3xl mt-2">
    <BiSearch className="w-5 h-5 text-[#454545]"/>
    <input type="text" placeholder="search groups" className="outline-none bg-transparent w-[88%]" />
    </div>
    {/* the chats container */}
    <div className="w-full flex flex-col gap-6 pt-7">
    {groups?.map((item:Group,index:number)=>{
      return(
        <div className="w-full cursor-pointer flex justify-between" key={index} onClick={()=>handlePress(item)}>
         <div className="flex items-center gap-3">
         <div>
          <img src={item.icon} className="w-[42px] h-[42px] rounded-full object-cover"/>
         </div>
         <div>
          <h2 className="leading-none font-semibold text-[#222] font-[rubik-light]">{item.name}</h2>
          <ul className="text-sm flex items-center">{item.members?.slice(-1).map((item:User,index:number)=>{
            return <li className="text-[14px] text-[#444]" key={index}>{item.username}...</li>
          })}</ul>
         </div>
         </div>
         <p className="text-[#454545] text-xs">10:45 AM</p>
        </div>
      )
    })}
    </div>
    {/* the create group button */}
    <div onClick={()=>dispatch(setShowCreateGroup(true))} className="bg-[#773ee0] shadow-3xl bottom-[80px] sm:bottom-16 cursor-pointer right-3 absolute rounded-full flex items-center p-1 justify-center sm:p-2">
    <BiPlus className="w-6 h-6 text-white"/>
    </div>
    </div>
  )
}

export default Groups;
