import { useDispatch } from "react-redux";
import { setShowImageViewer } from "../slices/modalSlice";
import { setViewImage } from "../slices/servicesSlice";
import { getRealTime } from "../utils/messages";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";


const ImageMessage = (props:Message) => {

  const {setViewImages} = useContext(ChatContext);

  const dispatch = useDispatch();
  //function to open the image in the image viewer
  function openImageViewer(){
  dispatch(setViewImage(props.image));
  dispatch(setShowImageViewer(true));
  setViewImages()
  }

  return (
    <div className="w-full mt-8 flex justify-end">
    <div className="gap-2 flex sm:max-w-[40%] max-w-[85%]">
      {/* the image message */}
      <div className="bg-[#7e47e5] rounded-md w-[320px] p-2 object-cover">
      <img onClick={()=>openImageViewer()} src={props.image} className="max-h-[300px] w-full rounded-md object-cover"/>
      <p className="text-sm p-1 text-white leading-none">{props.text}</p>
      <p className="w-full flex justify-end text-white text-xs">{getRealTime(props.createdAt)}</p>
      </div>
    </div>
    </div>
  )
}

export default ImageMessage;
