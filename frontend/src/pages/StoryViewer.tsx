import { BiChevronLeft, BiDotsVerticalRounded } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setShowSideBar } from "../slices/sidebarSlice";

const StoryViewer = () => {

  //get the user id from the parameters
  const {userId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stories:Story[] = useSelector((state:any)=>state.stories.stories);

  //extract the user's stories
  const userStories:Story[] = stories.filter((item:Story)=>{
    return item.owner._id === userId
  });

  return (
    <div className="w-full h-[100vh]">
    {/* the header */}
    <div className="w-full sticky bg-white flex items-center px-4 top-0 sm:top-11 border-solid border-t-[1px] border-b-[1px] border-gray-200 h-[60px]">
    <h1 className="flex items-center gap-4 font-[rubik-light] font-semibold">
      <div onClick={()=>{
             //show the sidebar first
             dispatch(setShowSideBar(true));
             //navigate to the home/chat
             navigate("/home/chat");
            }} className="bg-[#efefef] sm:hidden rounded-full">
            <BiChevronLeft className="w-7 h-7"/>
            </div>
      View stories
      </h1>
    </div>
    {/* the stories container */}
    <div className="w-full flex justify-center sm:py-auto h-full items-center">
    {userStories.slice(-1).map((item:Story,index:number)=>{
      return(
      <div key={index} className="h-screen sm:w-[310px] flex flex-col justify-between sm:h-[456px] sm:rounded-md bg-black">
      {/* the profile */}
      <div className="w-full flex justify-between px-2 py-3">
      <div className="flex items-center gap-2">
      <div>
      <img src={item.owner.profile_pic} className="w-9 h-9 rounded-full object-cover"/>
      </div>
      {/* the details */}
      <div className="">
      <h2 className="text-white leading-none font-[rubik-light]">{item.owner.username}</h2>
      <p className="text-white text-xs leading-none font-[rubik-light]">6h ago</p>
      </div>
      </div>
      <BiDotsVerticalRounded className="w-6 h-6 cursor-pointer text-white"/>
      </div>
      {/* the status value */}
      <div className="w-full h-[260px] flex flex-row items-center" style={{backgroundColor:item.story_background}}>
      <p className="text-white text-center px-2 font-[rubik-bold]">{item.story_text}</p>
      </div>
      {/* the last container */}
      <div className=""></div>
      </div>
      )
    })}
    </div>
    </div>
  )
}

export default StoryViewer;

