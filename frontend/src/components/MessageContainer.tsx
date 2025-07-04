import { useSelector } from "react-redux";
import MyMessage from "./MyMessage";
import OtherMessage from "./OtherMessage";
import { audios } from "../audios/audios";
import UploadImage from "../modals/UploadImage";
import ImageMessage from "./ImageMessage";
import OtherImage from "./OtherImage";

const MessageContainer = () => {

  const messages:Message[]= useSelector((state:any)=>state.chat.messages);
  const activeChat = useSelector((state:any)=>state.chat.active_chat);
  const userData = useSelector((state:any)=>state.user)

  return (
    <>
    <div className="px-6 pt-7 pb-24">
    {/* the audios */}
    <audio src={audios.message_sent} id="sent" hidden></audio>
    <audio src={audios.new_message} id="received" hidden></audio>
    {/* the end of the audios */}
    {messages.map((item:Message,index:any)=>{
    if(item.sender._id === userData._id && item.receiver === activeChat._id || item.sender._id === activeChat._id && item.receiver === userData._id || item.sender._id !== activeChat._id && item.receiver === activeChat._id){
    if(item.message_type === 'text'){
       if(item.sender._id === userData._id){
      return <MyMessage key={index} {...item}/>
     }else{
      return <OtherMessage key={index} {...item}/>
    }
    }else if (item.message_type === 'image'){
    if(item.sender._id === userData._id){
      return <ImageMessage key={index} {...item}/>
    }else{
      return <OtherImage key={index} {...item}/>
    }
    }
    }
    })}
    </div>
    <UploadImage/>
    </>
  )
}

export default MessageContainer;
