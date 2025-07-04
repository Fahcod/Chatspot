import { BiChevronRight, BiEdit, BiLogOut } from "react-icons/bi"
import { useDispatch } from "react-redux"
import { setShowUpdateProfile } from "../../slices/modalSlice"
import { useSelector } from "react-redux"

const Profile = () => {

  const dispatch = useDispatch();
  const userData = useSelector((state:any)=>state.user)

  return (
    <div className="w-full h-full">
    {/* the header */}
    <div className="w-full flex items-center justify-between py-4">
    <h2 className="font-[rubik-bold] text-xl">Profile</h2>
    </div>
    {/* the profile information */}
    <div className="w-full">
    <div className="w-full flex justify-center">
    <img src={userData?.profile_pic} className="w-[130px] h-[130px] rounded-full object-cover"/>
    </div>
    <div className="w-full flex justify-center pt-3">
    <div>
    <h2 className="text-center font-[rubik-bold]">{userData?.username}</h2>
    <p className="font-[rubik-light] text-sm">{userData?.profile_bio}</p>
    </div>
    </div>
    <hr className="mt-3 bg-gray-200 border-none outline-none h-[1px]"/>
    {/* more */}
    <div className="w-full pt-3">
    
    <div className="flex items-center justify-between cursor-pointer py-3">
    <div className="flex items-center gap-2">
    <p className="font-[rubik-semibold]">Groups</p>
    </div>
    <BiChevronRight className="w-7 h-7"/>
    </div>

    <div className="flex items-center justify-between cursor-pointer py-3">
    <div className="flex items-center gap-2">
    <p className="font-[rubik-semibold]">Contacts</p>
    </div>
    <BiChevronRight className="w-7 h-7"/>
    </div>

    <div className="flex items-center justify-between cursor-pointer py-3">
    <div className="flex items-center gap-2">
    <p className="font-[rubik-semibold]">Contacts</p>
    </div>
    <BiChevronRight className="w-7 h-7"/>
    </div>

    <div className="flex items-center justify-between cursor-pointer py-3">
    <div className="flex items-center gap-2">
    <p className="font-[rubik-semibold]">Contacts</p>
    </div>
    <BiChevronRight className="w-7 h-7"/>
    </div>
    
    </div>
    {/* end of the options */}
     <hr className="mt-3 bg-gray-200 border-none outline-none h-[1px]"/>
    {/* the last options */}
    <div className="w-full pt-3 flex flex-col gap-3 py-2">
    
    <div onClick={()=>dispatch(setShowUpdateProfile(true))} className="flex items-center cursor-pointer gap-2">
    <BiEdit className="w-6 h-6"/>
    <p className="font-[rubik-light] font-semibold">Edit profile</p>
    </div>

    <div className="flex items-center cursor-pointer text-red-500 gap-2">
    <BiLogOut className="w-6 h-6"/>
    <p className="font-[rubik-light] font-semibold">Logout</p>
    </div>
    
    </div>
    </div>
      
    </div>
  )
}

export default Profile
