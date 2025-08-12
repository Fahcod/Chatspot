import {CgBell, CgComment} from "react-icons/cg";
import {TbPhone, TbUsers} from "react-icons/tb"
import Chats from "./SidebarPages/Chats";
import Profile from "./SidebarPages/Profile";
import { useDispatch, useSelector } from "react-redux";
import Calls from "./SidebarPages/Calls";
import Notifications from "./SidebarPages/Notifications";
import Groups from "./SidebarPages/Groups";
import { setActiveComponent } from "../slices/sidebarSlice";
import BottomNav from "./ResponsiveComps/BottomNav";

const Sidebar = () => {

  const sidebarState = useSelector((state:any)=>state.sidebar.active_component);
  const userProfile:string = useSelector((state:any)=>state.user.profile_pic)
  const dispatch = useDispatch();
  const isShow = useSelector((state:any)=>state.sidebar.show_sidebar);

  //this function returns the item to be displayed in the sidebar
  function componentDisplay(){
  switch(sidebarState){
   case "Chats":
    return <Chats/>
   case "Groups":
    return <Groups/>
   case "Profile":
    return <Profile/>
   case "Calls":
   return <Calls/>
   case "Notifications":
   return <Notifications/>
  }
  }

  return (
    <div className={`overflow-y-auto [&::-webkit-scrollbar]:w-0 fixed flex ${isShow?'translate-x-100 sm:translate-x-0 ':'translate-x-0'} duration-500 bg-[#f8f9fb] h-screen w-[100%] z-[200] sm:z-0 sm:w-[30%]`}>
    {/* the left container */}
    <div className="w-0 sm:w-[15%] pt-6 pb-16 flex flex-col items-center justify-between h-screen bg-[#f8f9fb]">
    {/* the icons container */}
    <div className="flex flex-col gap-11 pt-3 items-center">
    <div className={`${sidebarState=='Groups'?'p-1.5 rounded-md text-white bg-[#773ee0]':''} cursor-pointer`} onClick={()=>dispatch(setActiveComponent("Groups"))}>
    <TbUsers className="w-6 h-6"/>
    </div>
    <div className={`${sidebarState=='Calls'?'p-1.5 rounded-md text-white bg-[#773ee0]':''} cursor-pointer`} onClick={()=>dispatch(setActiveComponent("Calls"))}>
    <TbPhone className="w-6 h-6"/>
    </div>
    <div className={`${sidebarState=='Chats'?'p-1.5 rounded-md text-white bg-[#773ee0]':''} cursor-pointer`} onClick={()=>dispatch(setActiveComponent("Chats"))}>
    <CgComment className="w-6 h-6"/>
    </div>
    <div className={`${sidebarState=='Notifications'?'p-1.5 rounded-md text-white bg-[#773ee0]':''} cursor-pointer`} onClick={()=>dispatch(setActiveComponent("Notifications"))}>
    <CgBell className="w-7 h-7"/>
    </div>

    </div>
    {/* the profile pic container */}
    <div className="cursor-pointer" onClick={()=>dispatch(setActiveComponent("Profile"))}>
    <img src={userProfile || 'https://'} className="w-[43px] h-[43px] rounded-full object-cover"/>
    </div>
    </div>
    {/* the right container */}
    <div className="w-full sm:w-[85%] rounded-tl-lg px-4 border-solid border-[1px] border-gray-200  bg-[#fff] h-screen">
    {componentDisplay()}
    </div>
    <BottomNav/>
    </div>
  )
}

export default Sidebar;
