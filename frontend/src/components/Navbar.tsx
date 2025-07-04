import { BiChevronLeft, BiMenu } from "react-icons/bi";
import { TbPhone, TbVideo } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setShowContactInfo, setShowSideBar } from "../slices/sidebarSlice";
import { getRealTime } from "../utils/messages";


const Navbar = () => {

  const activeChat = useSelector((state:any)=>state.chat.active_chat);
  const onlineUsers:string[] = useSelector((state:any)=>state.chat.online_users);
  const dispatch = useDispatch()

  return (
    <div className="w-full flex items-center justify-between px-2 sm:px-3 sticky top-0 sm:top-11 bg-white h-[60px] border-solid border-b-[1px] border-t-[1px] border-gray-200">
    <div className="flex items-center gap-3">
    <div className="flex items-center gap-1" onClick={()=>dispatch(setShowSideBar(false))}>
    <BiChevronLeft className="w-8 h-8 cursor-pointer sm:hidden"/>
    <img src={activeChat?.profile_pic} className="w-[39px] h-[39px] rounded-full object-cover"/>
    </div>
    <div className="">
    <h2 className="leading-none font-semibold text-[15px] font-[rubik-light]">{activeChat?.username}</h2>
    {onlineUsers.includes(activeChat._id)?<p className="text-sm">online</p>:<p className="text-[#454545] text-xs">{activeChat.is_user?`Last seen yesterday ${getRealTime(activeChat.updatedAt)}`:''}</p>}
    </div>
    </div>
    {/* the left contents */}
    <div className="flex items-center gap-6">
    <TbVideo className="w-7 h-7 hidden sm:block cursor-pointer"/>

    <TbPhone className="w-6 h-6 hidden sm:block cursor-pointer"/>

    <BiMenu className="w-7 h-7 cursor-pointer" onClick={()=>dispatch(setShowContactInfo(true))}/>
    </div>
    </div>
  )
}

export default Navbar;
