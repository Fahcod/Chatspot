import { getRealTime } from "../utils/messages";

const MyMessage = (props:any) => {
  return (
    // the message container
    <div className="w-full flex mt-3 justify-end">
    {/* the message box */}
    <div className="max-w-[85%] sm:max-w-[40%]">
    <div className="bg-[#7e47e5] p-2 rounded-md text-white font-[rubik-light]">
    <p className="text-sm">{props.text}</p>
    </div>
    <p className="text-xs flex justify-end py-2 text-[#454545]">{getRealTime(props.createdAt)}</p>
    </div>
    </div>
  )
}

export default MyMessage;
