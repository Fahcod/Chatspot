import { useDispatch } from "react-redux";
import { getRealTime } from "../utils/messages";
import { setViewImage } from "../slices/servicesSlice";
import { setShowImageViewer } from "../slices/modalSlice";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const OtherImage = (props:Message) => {

  const dispatch = useDispatch();
  const {setViewImages} = useContext(ChatContext);

  function openImageViewer(){
  dispatch(setViewImage(props.image));
  dispatch(setShowImageViewer(true));
  setViewImages()
  }

  return (
    <div className="w-full mt-8">
    <div className="gap-2 flex sm:max-w-[40%] max-w-[95%]">
      {/* the sender info */}
      <div className="w-9 flex-shrink-0">
      <img src={props.sender.profile_pic} className="flex-shrink-0 w-8 h-8 rounded-full object-cover"/>
      </div>
      {/* the image message */}
      <div className="bg-[#e4e1e1] rounded-md w-[320px] p-2 object-cover">
      <img onClick={()=>openImageViewer()} src={props.image} className="w-full rounded-md bg-white sm:max-h-[300px] object-cover"/>
      <p className="text-sm p-1 leading-none">{props.text}</p>
      <p className="w-full flex justify-end text-xs">{getRealTime(props.createdAt)}</p>
      </div>
    </div>
    </div>
  )
}

export default OtherImage;