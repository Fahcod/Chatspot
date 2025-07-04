import { BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setShowAddGroupMembers } from "../slices/modalSlice";
import { axiosInstance } from "../utils/api";


const AddMember = () => {
  const dispatch = useDispatch();
  //the boolean to tell whether to display or hide this modal
  const isShow:boolean = useSelector((state:any)=>state.modals.show_add_members);
  const contacts:User[] = useSelector((state:any)=>state.users.all_chats);
  //get the current active chat
  const activeChat = useSelector((state:any)=>state.chat.active_chat);
  //get the data and extract the group mebers
  const allGroups:Group[] = useSelector((state:any)=>state.groups.groups);
  //get the current group
  const currentGroup:any = allGroups?.find(e=>e._id === activeChat._id);
  //the members
  const members:any[] = currentGroup?.members;

  //the add member function
  const addMember = async (memberId:string):Promise<void> =>{
  let response = await axiosInstance.put(`/api/v1/groups/add-member/${activeChat._id}/${memberId}`);
  if(response.status === 201){
  alert(response.data.message)
  }else{
    alert(response.data.message)
  }
  }

  return (
    <div className={`${isShow?'flex':'hidden'} items-center justify-center w-full h-screen bg-[#25252570] fixed top-0 z-[400]`}>
    {/* the users container */}
    <div className="bg-white relative px-5 w-full sm:w-[375px] h-screen sm:h-[500px] sm:rounded-md">
    {/* the header */}
    <div className="w-full flex justify-between items-center h-[50px]">
    <h1 className="font-[rubik-semibold]">Add group members</h1>
    <div className="bg-[#efefef] cursor-pointer p-1 rounded-full">
    <BiX className="w-6 h-6" onClick={()=>dispatch(setShowAddGroupMembers(false))}/>
    </div>
    </div>
    <hr className="mt-2 outline-none h-[1px] bg-gray-200 border-none"/>
    {/* the members container */}
    <div className="w-full flex flex-col gap-4 pt-3">
    {contacts?.map((item:User,index:number)=>{
      if(!members?.includes(item._id)){
      return (
        <div key={index} className="cursor-pointer w-full flex gap-4 justify-between">
        <div className="flex items-center gap-3">
        <div>
          <img src={item.profile_pic} className="w-[45px] h-[45px] rounded-full object-cover"/>
        </div>
        <div>
          <h2 className="text-[#222] font-[rubik-light] font-semibold">{item.username}</h2>
          <p className="leading-none text-sm text-[#454545]">+{item.phone}</p>
        </div>
        </div>
        {/* the add button */}
        <div>
       <button onClick={()=>addMember(item._id)} className="text-white rounded-md py-1 px-4 cursor-pointer text-sm font-[rubik-light] bg-[#7e47e5]">Add</button>
        </div>
        </div>
      )
    }
    })}
    </div>
    </div>
    </div>
  )
}

export default AddMember;
