import { useContext, useState} from "react";
import { BiX } from "react-icons/bi";
import { axiosInstance } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setShowUpdateProfile } from "../slices/modalSlice";
import { ChatContext } from "../context/ChatContext";

const UpdateProfile = () => {

    const isShow = useSelector((state:any)=>state.modals.show_update_profile);
    const dispatch = useDispatch();
    const {fetchUser} = useContext<any>(ChatContext);
    const userInfo:User = useSelector((state:any)=>state.user);
   
    const [image,setImage] = useState(null);
    const [userData,setFormData]=useState({
        username:userInfo?.username,
        user_bio:userInfo?.profile_bio
    });

    const  handleChange = (e:any)=>{
        setFormData({...userData,[e.target.name]:e.target.value})
    }

    //function to submit the data
    const submitData = async (event:any)=>{
        //validate the data first
        if(userData.user_bio === '' || userData.username === '' || image === ''){
            alert("Fill in all the form fields")
            return
        }
        event.preventDefault();
        let formData = new FormData();
        formData.append("username",userData.username)
        formData.append("user_bio",userData.user_bio)
        formData.append("image",image?image:"")

        let response = await axiosInstance.put('/api/v1/user/update-profile',formData);
        if(response.status === 201){
           fetchUser()
            dispatch(setShowUpdateProfile(false))
        }else{
            console.error("Something went wrong")
        }
    }

  return (
    <div className={`w-full ${isShow?'flex':'hidden'} items-center justify-center h-screen fixed top-0 z-[400] bg-[#0000007e]`}>
    {/* the form */}
    <form method="put" onSubmit={submitData} className="w-[90%] sm:w-[380px] pb-5 bg-white rounded-md">
    <div className="w-full flex items-center justify-between py-2 px-5">
    <h2 className="font-[rubik-bold] text-lg">Update profile</h2>
    <div onClick={()=>dispatch(setShowUpdateProfile(false))} className="bg-[#efefef] rounded-full cursor-pointer p-1">
    <BiX className="w-6 h-6"/>
    </div>
    </div>
    {/* the profile pic */}
    <div className="w-full flex justify-center pt-4">
    <label htmlFor="file">
    {image?<img src={URL.createObjectURL(image)} className="w-[130px] h-[130px] rounded-full object-cover"/>:<div className="w-[130px] h-[130px] bg-[#efefef] rounded-full"></div>}
    </label>
    </div>
    <input type="file" id="file" name="file" onChange={(e:any)=>setImage(e.target.files[0])} hidden/>
    {/* the other fields */}
    <div className="w-full flex flex-col gap-4 px-5 pt-5">
    <input type="text" value={userData.username} onChange={handleChange} name="username" placeholder="New username" className="outline-none rounded-md p-2 border-solid border-[1px] border-gray-200"/>
    <textarea value={userData.user_bio} onChange={handleChange} name="user_bio" placeholder="New bio" className="outline-none rounded-md p-2 border-solid border-[1px] border-gray-200"></textarea>
    <button type="submit" className="w-full bg-[#7e47e5] text-white font-[rubik-light] rounded-md p-2">Update profile</button>
    </div>
    </form>
    </div>
  )
}

export default UpdateProfile;
