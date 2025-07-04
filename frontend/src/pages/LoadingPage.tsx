import { useNavigate } from "react-router-dom";
import { icons } from "../assets/assets";
import { axiosInstance } from "../utils/api";
import { useEffect } from "react";


const LoadingPage = () => {

    const navigate = useNavigate();

    const checkAuth = async () =>{
    let response = await axiosInstance.get('/api/v1/user/get');
    if(response.data.success){
        navigate("/home");
    }else {
        navigate("/login")
    }

    }

   useEffect(()=>{
    checkAuth()
   },[]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
    <div className="flex flex-col gap-2 items-center">
    <img src={icons.app_logo} className="w-[86px] h-[86px]" />
    <h1 className="font-[rubik-bold] text-lg">Chatspot</h1>
    </div>
    </div>
  )
}

export default LoadingPage;
