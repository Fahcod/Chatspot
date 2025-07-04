import { BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setShowCreateGroup } from "../slices/modalSlice";
import { useContext, useState } from "react";
import { axiosInstance } from "../utils/api";
import { ChatContext } from "../context/ChatContext";


const CreateGroup = () => {

    const isActive = useSelector((state:any)=>state.modals.show_create_group);
    const dispatch = useDispatch();
    const [icon,setIcon]=useState<any>(null);
    const {getAllGroups}:any = useContext(ChatContext);
    const [groupData,setGroupData] = useState({
        name:"",
        description:""
    });

    const handleChange = (e:any)=>{
        setGroupData({...groupData,[e.target.name]:e.target.value})
    }

    //send the data to create
    const sendData = async (event:any)=>{
        event.preventDefault();
        let formData = new FormData();
        formData.append("name",groupData.name);
        formData.append("description",groupData.description);
        formData.append("image",icon);

        let response = await axiosInstance.post('/api/v1/groups/create',formData);
        if(response.status === 200){
            dispatch(setShowCreateGroup(false));
            getAllGroups()
        }else{
            alert(response.data.message)
        }
    }

  return (
    <div className={`${isActive?'flex':'hidden'} items-center justify-center w-full h-screen bg-[#25252570] fixed top-0 z-[400]`}>
    <form method="post" onSubmit={sendData} className="w-[90%] sm:w-[370px] bg-white px-5 rounded-md py-4">
    {/* header */}
    <div className="w-full flex items-center justify-between">
    <h2 className="font-[rubik-bold] text-lg">Create a group</h2>
    <div className="bg-[#efefef] cursor-pointer p-1 rounded-full flex items-center justify-center">
    <BiX className="w-6 h-6" onClick={()=>dispatch(setShowCreateGroup(false))}/>
    </div>
    </div>
    {/* fields */}
    <div className="w-full flex flex-col gap-4 pt-7">
    <div className="w-full">
    <input type="text" value={groupData.name} onChange={handleChange} name="name" className="w-full p-2 rounded-md outline-none border-solid border-[1px] border-gray-200" placeholder="Group name" autoComplete="off"/>
    </div>
    <div className="w-full">
    <textarea name="description" value={groupData.description} onChange={handleChange} className="w-full p-2 h-24 rounded-md outline-none border-solid border-[1px] border-gray-200" placeholder="Group description" autoComplete="off"></textarea>
    </div>
    <div className="w-full">
    <label htmlFor="icon">
    <div className={`w-full p-2 cursor-pointer border-solid ${icon?'border-[1px]  border-green-300 bg-green-100':'border-[1px] bg-blue-100 border-blue-400'} rounded-md text-center font-[rubik-light]}`}>{icon?'Group icon uploaded':'Upload a group icon'}</div>
    </label>
    </div>
    <input type="file" id="icon" onChange={(e:any)=>setIcon(e.target.files[0])} hidden/>
    {/* the last btns */}
    <div className="w-full">
    <button type="submit" className="bg-purple-800 cursor-pointer p-2 rounded-md w-full text-white font-[rubik-light]">Create</button>
    </div>
    </div>
    </form>
    </div>
  )
}

export default CreateGroup;
