import BottomBar from "../components/BottomBar";
import MessageContainer from "../components/MessageContainer";
import Navbar from "../components/Navbar";


const ChatPage = () => {
  return (
    <div className="w-full">
    <Navbar/>
    <MessageContainer/>
    <BottomBar/>
    </div>
  )
}

export default ChatPage;
