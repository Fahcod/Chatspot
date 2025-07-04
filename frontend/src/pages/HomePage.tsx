import { FaCommentDots } from "react-icons/fa6";
import MainContainer from "../components/MainContainer";
import Sidebar from "../components/Sidebar";
import UpdateProfile from "../modals/UpdateProfile";
import CreateGroup from "../modals/CreateGroup";
import ChatInfo from "../components/ChatInfo";
import AddMember from "../modals/AddMember";
import ImageViewer from "../modals/ImageViewer";


const HomePage = () => {
  return (
    <>
    <UpdateProfile/>
    <CreateGroup/>
    <AddMember/>
    <ImageViewer/>
    
    <div className="w-full h-full">
    <div className="bg-[#f8f9fb] hidden items-center sm:flex px-5 w-full h-11 sticky top-0">
    <div className="flex items-center cursor-pointer gap-2">
    <FaCommentDots className="text-[#773ee0] w-5 h-5"/>
    <p className="text-[#773ee0] font-semibold">Chatspot</p>
    </div>
    </div>
    <div className="w-full flex  bg-[#fff] bg-fixed">
    <Sidebar/>
    <MainContainer/>
    <ChatInfo/>
    </div>
    </div>
    </>
  )
}

export default HomePage;
