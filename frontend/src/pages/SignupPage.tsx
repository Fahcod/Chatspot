import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signupSchema } from "../schemas/schemas";
import { axiosInstance } from "../utils/api";
import { FaCommentDots } from "react-icons/fa6";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { icons } from "../assets/assets";


const SignupPage = () => {
    
    const navigate = useNavigate();
    const {fetchUser} = useContext<any>(ChatContext);

    const sendData = async (values:any)=>{
    let response = await axiosInstance.post('/api/v1/user/signup',values);
    if(response.status === 201){
      alert(response.data.message);
      localStorage.setItem("SOCKET_CONN",response.data.userID)
      navigate("/home/");
      fetchUser();
    }else{
      alert(response.statusText)
      console.log(response.status)
    }
    }

    const onSubmit= (values:any,actions:any)=>{
    sendData(values)
    actions.resetForm();
    console.log({sendingData:values})
    }

    //Collect the user signup data
   const {touched,isSubmitting,values,errors,handleChange,handleBlur,handleSubmit} = useFormik({
    initialValues:{
    fullname:"",
    username:"",
    email:"",
    country_code:"256",
    phone:"",
    password:""
    },
    validationSchema:signupSchema,
    onSubmit
 });

  return (
    <div className="w-full flex h-screen">
    {/* the left cont */}
    <div className="sm:flex hidden items-center justify-center bg-[linear-gradient(rgba(4,9,30,0.7),rgba(4,9,30,0.7))] w-full h-full">
    <img src={icons.auth_bg} className="absolute w-full h-full z-[-1]"/>
    <div className="flex w-full items-center flex-col gap-1">
    <FaCommentDots className="text-white w-24 h-24 mb-11"/>
    <h1 className="text-white font-[rubik-extrabold] text-4xl">Welcome to <span className="text-[#fff]">Chatspot</span></h1>
    <p className="text-white max-w-[80%] font-[rubik-light] font-semibold text-center">You are welcome to Chatspot, create and account and connect with your family, friends and all people of interest wherever they are</p>
    </div>
    </div>
    {/* the right cont || the form div*/}
    <form method="post" onSubmit={handleSubmit} className="bg-white flex items-center justify-center flex-shrink-0 w-full sm:w-[460px] h-full">
    <div className="w-full">
    <h1 className="font-[rubik-bold] text-2xl text-center">Chatspot Signup</h1>
    {/* the actual form */}
    <div className="w-full flex flex-col gap-7 pl-[9%] pt-5">

    <div className="w-[90%]">
    <input type="text" onBlur={handleBlur} onChange={handleChange} value={values.fullname} name="fullname" className="outline-none p-3 rounded-md w-full border-solid border-[1px] border-gray-200" placeholder="Your fullname" autoComplete="off"/>
    <p className="text-sm pt-1 text-red-500">{errors.fullname && touched.fullname?errors.fullname:""}</p>
    </div>

    <div className="w-[90%]">
    <input type="text" onBlur={handleBlur} onChange={handleChange} value={values.username} name="username" className="outline-none p-3 rounded-md w-full border-solid border-[1px] border-gray-200" placeholder="Your username" autoComplete="off"/>
    <p className="text-sm pt-1 text-red-500">{errors.username && touched.username?errors.username:""}</p>
    </div>

    <div className="w-[90%]">
    <input type="text" onBlur={handleBlur} onChange={handleChange} value={values.email} name="email" className="outline-none p-3 rounded-md w-full border-solid border-[1px] border-gray-200" placeholder="Your email" autoComplete="off"/>
    <p className="text-sm pt-1 text-red-500">{errors.fullname && touched.fullname?errors.fullname:""}</p>
    </div>

    <div className="w-[90%] flex gap-3">
    <select name="code" onBlur={handleBlur} onChange={handleChange} value={values.country_code} className="outline-none p-3 rounded-md w-[40%] border-solid border-[1px] border-gray-200">
    <option value="256">+256</option>
    </select>
    <input type="number" onBlur={handleBlur} onChange={handleChange} value={values.phone} name="phone" className="outline-none p-3 rounded-md w-full border-solid border-[1px] border-gray-200" placeholder="Your phone number" autoComplete="off"/>
    </div>

    <div className="w-[90%]">
    <input type="password" onBlur={handleBlur} onChange={handleChange} value={values.password} name="password" className="outline-none p-3 rounded-md w-full border-solid border-[1px] border-gray-200" placeholder="Your password" autoComplete="off"/>
    <p className="text-sm pt-1 text-red-500">{errors.password && touched.password?errors.password:""}</p>
    </div>

    <div className="w-[90%]">
   <button type="submit" disabled={isSubmitting?true:false} className="w-full outline-none text-white bg-[#773ee0]  p-3 rounded-md font-[Rubik-light]">Signup</button>
    </div>

    </div>
    {/* the end of the form */}
    <p className="pl-[8%] pt-3 text-[#454545]">Already have an account?<Link to="/login">Login</Link></p>
    </div>
    </form>
    
    </div>
  )
}

export default SignupPage;
