import { useContext, useState } from "react";
import { BiPaperclip } from "react-icons/bi";
import { FaPaperPlane } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../utils/api";
import { addMessage } from "../slices/chatSlice";
import { playMessageSent } from "../utils/soundEffects";
import { ChatContext } from "../context/ChatContext";
import { setShowSendImage } from "../slices/modalSlice";

const BottomBar = () => {

  const [messageText,setMessageText] = useState("");
  const chatData = useSelector((state:any)=>state.chat.active_chat);
  const userData = useSelector((state:any)=>state.user);
  const dispatch = useDispatch();
  const {setImageMessage}:any = useContext(ChatContext);

  //send the message
  const sendPersonalMessage = async ()=>{
  //validate the message
  if(messageText.length<0) return alert('Please message is empty')
  //send the message
  let response = await axiosInstance.post('/api/v1/messages/send-text',{
    text:messageText,
    receiver:chatData?._id,
    sender_username:userData.username,
    sender_profile:userData.profile_pic
  });
  if(response.status === 200){
  dispatch(addMessage(response.data.message));
  playMessageSent()
  setMessageText("")
  }else{
    alert(response.data.message)
  }
  }

  const sendGroupMessage = async ()=>{
  //validate the message
  if(messageText.length<0) return alert('Please message is empty')
  //send the message
  let response = await axiosInstance.post('/api/v1/messages/send-group-text',{
    text:messageText,
    receiver:chatData?._id,
    sender_username:userData.username,
    sender_profile:userData.profile_pic
  });
  if(response.status === 200){
  dispatch(addMessage(response.data.message));
  playMessageSent()
  setMessageText("")
  }else{
    alert(response.data.message)
  }
  }

  return (
    <div className="flex items-center justify-between fixed bottom-0 w-full sm:w-[70%] sm:h-[60px] h-[55px]">
    
    <div className="flex bg-white h-[60px] border-t-[1px] border-gray-200 px-3 border-solid items-center justify-between w-full">
    <div className="flex items-center gap-4 w-[90%]">
    <label htmlFor="img">
    <BiPaperclip className="text-[#454545] w-6 h-6"/>
    </label>
    
    <input type="text" value={messageText} onChange={(e)=>setMessageText(e.target.value)} className="w-full outline-none" placeholder="type your message here ..."/>
    </div>
    <input type="file" name="img" id="img" hidden onChange={(e:any)=>{
      setImageMessage(e.target.files[0]);
      dispatch(setShowSendImage(true))
    }}/>
    <button onClick={()=>{
      if(chatData.is_user){
        sendPersonalMessage()
      }else{
        sendGroupMessage()
      }
    }} className="bg-[#773ee0] outline-none w-8 h-8 sm:w-9 sm:h-9 flex justify-center items-center rounded-full">
    <FaPaperPlane className="text-white h-4 w-4 sm:w-5 sm:h-5 cursor-pointer"/>
    </button>
    </div>

    </div>
  )
}

export default BottomBar;
