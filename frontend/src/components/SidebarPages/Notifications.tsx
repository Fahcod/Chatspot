import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";


const Notifications = () => {

//get the notifications
const notifications:any[] = useSelector((state:any)=>state.services.notifications);

  return (
    <div className="w-full h-full">
      <div className="w-full flex items-center justify-between py-4">
          <h2 className="font-[rubik-bold] text-xl">Notifications</h2>
          </div>
      <div className="w-full flex flex-col gap-4">
      {notifications.map((item:any,index:number)=>{
        return (
          <div className="w-full bg-[#fafafa] rounded-sm p-2 cursor-pointer" key={index}>
          {/* the header */}
          <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
          <div>
          <img src={item.from.profile_pic} className="w-[35px] h-[35px] rounded-full object-cover"/>
          </div>
          <div>
          <h2 className="font-[rubik-light] text-[15px] text-[#222] font-semibold">{item.notify_type}</h2>
          <p className="text-xs text-[#454545] leading-none">2h ago</p>
          </div>
          </div>
          {/* the options */}
          <BiTrash className="text-[#222] w-5 h-5"/>
          </div>
          <p className="text-sm pt-1 text-[#454545]">{item.text + ` by ${item.from.username}`}</p>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default Notifications;
