import { BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowSideBar } from "../slices/sidebarSlice";

const Stories = () => {

    const users:User[] = useSelector((state:any)=>state.users.all_chats);
    const navigate = useNavigate();
    const dispatch = useDispatch();

  return (
    <>
    <div className="w-full pt-4">
    <div>
    <h1 className="font-[rubik-bold] text-lg text-[#222]">Stories</h1>
    </div>
    {/* the stories */}
    <div className="w-full flex overflow-x-auto items-center [&::-webkit-scrollbar]:w-0 gap-5">
    <div onClick={()=>{
    navigate('/home/create-status');
    dispatch(setShowSideBar(true))
    }} className="w-[58px] flex-shrink-0 flex items-center justify-center cursor-pointer h-[58px] rounded-full border-solid border-[1px] border-green-500">
    <div className="bg-green-500 p-1 rounded-full">
    <BiPlus className="text-white w-6 h-6"/>
    </div>
    </div>
    {users.map((item:User,index:number)=>{
    return(
    <div key={index} onClick={()=>{
    navigate(`/home/view-stories/${item._id}`);
    dispatch(setShowSideBar(true))
    }} className="flex-shrink-0 w-[58px] cursor-pointer overflow-hidden h-[58px] rounded-full border-solid border-[2px] border-green-500">
    <img src={item.profile_pic} className="w-full h-full object-cover"/>
    </div>
    )
    })}
    </div>
    </div>
    <hr className="border-none outline-none h-[1px] mt-2 bg-gray-200"/>
    </>
  )
}

export default Stories;
