import {CgComment} from "react-icons/cg";
import {TbPhone, TbUser, TbUsers} from "react-icons/tb"
import { useDispatch, useSelector } from "react-redux";
import { setActiveComponent } from "../../slices/sidebarSlice";


const BottomNav = () => {
  //this is the bottom navigation that shows up on smaller screens
  const dispatch = useDispatch();
  const sidebarState = useSelector((state:any)=>state.sidebar.active_component);

  return (
    <div className='px-4 flex items-center justify-between w-full sm:hidden h-[60px] bg-white border-solid border-t-[1px] border-gray-200 fixed bottom-0'>
    <div className={`flex flex-col items-center ${sidebarState=='Groups'?'text-[#773ee0]':''} cursor-pointer`} onClick={()=>dispatch(setActiveComponent("Groups"))}>
    <TbUsers className="w-6 h-6 text-[#222]"/>
    <p className="font-[rubik-light] text-[#222] text-[15px] font-semibold">Groups</p>
    </div>
        <div className={`flex flex-col items-center ${sidebarState=='Calls'?'text-[#773ee0]':''} cursor-pointer`} onClick={()=>dispatch(setActiveComponent("Calls"))}>
        <TbPhone className="w-6 h-6 text-[#222]"/>
        <p className="font-[rubik-light] text-[#222] text-[15px] font-semibold">Calls</p>
        </div>
        <div className={`flex flex-col items-center ${sidebarState=='Chats'?'text-[#773ee0]':''} cursor-pointer`} onClick={()=>dispatch(setActiveComponent("Chats"))}>
        <CgComment className="w-6 h-6 text-[#222]"/>
        <p className="font-[rubik-light] text-[#222] text-[15px] font-semibold">Chats</p>
        </div>
        <div className={`flex flex-col items-center ${sidebarState=='Notifications'?'text-[#773ee0]':''} cursor-pointer`} onClick={()=>dispatch(setActiveComponent("Profile"))}>
        <TbUser className="w-7 h-7 text-[#222]"/>
        <p className="font-[rubik-light] text-[#222] text-[15px] font-semibold">Profile</p>
        </div>
    </div>
  )
}

export default BottomNav;
