import { BiSmile, BiX } from "react-icons/bi";
import { FaRegPaperPlane } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setShowSendImage } from "../slices/modalSlice";
import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { axiosInstance } from "../utils/api";
import { addMessage } from "../slices/chatSlice";

const UploadImage = () => {

    const dispatch = useDispatch();
    const isActive:boolean = useSelector((state:any)=>state.modals.show_send_image);
    const activeChat = useSelector((state:any)=>state.chat.active_chat);
    const {imageMessage}:any = useContext(ChatContext);
    const [text,setText]=useState("")

    //function to send the image message from user to user
    const sendMessage = async ()=>{
        let formData = new FormData();
        formData.append("text",text);
        formData.append("receiver",activeChat._id);
        formData.append("sender_username",activeChat.username);
        formData.append("sender_profile",activeChat.profile_pic);
        formData.append("image",imageMessage);
        
        let response = await axiosInstance.post('/api/v1/messages/send-image',formData);
        if(response.status === 200){
            dispatch(setShowSendImage(false));
            dispatch(addMessage(response.data.message))
        }else{
            alert(response.data.message)
        }
    }

    //function to send the image message to a group
    const sendGroupImage = async ()=>{
        let formData = new FormData();
        formData.append("text",text);
        formData.append("receiver",activeChat._id);
        formData.append("sender_username",activeChat.username);
        formData.append("sender_profile",activeChat.profile_pic);
        formData.append("image",imageMessage);
        
        let response = await axiosInstance.post('/api/v1/messages/send-group-image',formData);
        if(response.status === 200){
            dispatch(setShowSendImage(false));
            dispatch(addMessage(response.data.message))
        }else{
            alert(response.data.message)
        }
    }


  return (
    <div className={`w-full sm:w-[380px] shadow-md duration-500 px-4 py-3 fixed ${isActive?'bottom-12':'bottom-[-400px]'} sm:ml-5 mb-6 bg-white rounded-md`}>
    <div className="w-full flex items-center justify-between">
    <h2 className="font-[rubik-bold]">Send an image</h2>
    <div className="cursor-pointer p-1 rounded-full bg-[#efefef]">
    <BiX className="w-5 h-5" onClick={()=>dispatch(setShowSendImage(false))}/>
    </div>
    </div>
    {/* the image */}
    <div className="w-full pt-3">
    <img src={imageMessage?URL.createObjectURL(imageMessage):'https://'} className="rounded-md w-full h-[225px] object-cover" />
    </div>
    {/* the message */}
    <div className="w-full mt-4 bg-[#efefef] pb-2">
    <textarea value={text} onChange={(e:any)=>setText(e.target.value)} placeholder="Add a caption (optional)" className="p-2 w-full outline-none"></textarea>
    <div className="w-full flex items-center gap-2 justify-end px-2">
    <BiSmile className="w-6 h-6 cursor-pointer text-[#454545]"/>
    <FaRegPaperPlane onClick={()=>{
      if(activeChat.is_user){
        sendMessage();
      }else{
        sendGroupImage()
      }
    }} className="w-5 h-5 cursor-pointer text-[#454545]"/>
    </div>
    </div>
    </div>
  )
}

export default UploadImage;
