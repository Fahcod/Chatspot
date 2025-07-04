import { getRealTime } from "../utils/messages";

const OtherMessage = (props:any) => {
  return (
    // the message container
    <div className="w-full flex mt-2">
    {/* the message box */}
    <div className="gap-2 sm:max-w-[45%] max-w-[95%]">
    <div className="w-full flex gap-2">
    <div className="flex-shrink-0 w-9">
      <img src={props.sender.profile_pic} className="flex-shrink-0 w-8 h-8 object-cover rounded-full"/>
    </div>
    <div className="bg-[#e4e1e1] p-2 rounded-md font-[rubik-light]">
    <p className="text-sm">{props.text}</p>
    </div>
    </div>
    <p className="text-[#454545] flex justify-end text-xs py-1">{getRealTime(props.createdAt)}</p>
    </div>
    </div>
  )
}

export default OtherMessage;