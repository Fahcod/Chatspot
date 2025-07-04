import { useState } from "react";
import { BiChevronLeft, BiEdit, BiImage, BiSolidVideos } from "react-icons/bi";
import { FaTextWidth } from "react-icons/fa6";
import { story_themes } from "../utils/themes";
import { axiosInstance } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setShowSideBar } from "../slices/sidebarSlice";

//the components for different stories
const CreateImageForm = () =>{
  //store the image and text data here
  const [image,setImage] = useState<any>("");
  const [text,setText] = useState<string>("");

  return(
    <>
    <div className="flex gap-5">
    {/* the story info form */}
    <div className="w-[450px] flex flex-col gap-5">
    <div className="w-full h-[300px] rounded-md overflow-hidden">
    {image?<img src={URL.createObjectURL(image)} className="w-full h-full object-cover"/>:
    // the no image div
    <div className="w-full h-[300px] bg-[#efefef] flex items-center justify-center">
    <h2 className="font-[rubik-bold] text-lg text-[#999]">Upload story image</h2>
    </div>
    }
    </div>
    {/* the text input cont */}
    <textarea value={text} onChange={(e)=>setText(e.target.value)} className="w-full outline-none border-none bg-[#efefef] p-3 rounded-md" placeholder="type your status text here"/>
    <button className="cursor-pointer max-w-[150px] text-sm font-[rubik-light] text-white py-2 px-5 rounded-md bg-[#773ee0]">Upload story</button>
    </div>
    {/* the themes */}
    <div className="flex flex-col gap-4">

    <div className="bg-[#efefef] p-2 rounded-full flex items-center justify-center cursor-pointer">
    <BiEdit className="w-6 h-6 text-[#222]"/>
    </div>

    <div className="bg-[#efefef] p-2 rounded-full flex items-center justify-center cursor-pointer">
    <BiEdit className="w-6 h-6 text-[#222]"/>
    </div>

    <div className="bg-[#efefef] p-2 rounded-full flex items-center justify-center cursor-pointer">
    <BiEdit className="w-6 h-6 text-[#222]"/>
    </div>
    
    <div className="bg-[#efefef] p-2 rounded-full flex items-center justify-center cursor-pointer">
    <label htmlFor="story">
    <BiImage className="w-6 h-6 text-[#222]"/>
     </label>
    </div>

    <input type="file" name="story" id="story" hidden onChange={(e:any)=>setImage(e.target.files[0])}/>
   
    </div>
    </div>
    </>

  )
}

//the creation of a text story
const CreateTextForm = () =>{

  const [text,setText] = useState("");
  const [bgColor,setBgColor] = useState("#333");

  //the function to upload the story
  const uploadStory = async ():Promise<void>=>{
  //check if the text is not empty
   if(!text){
    return alert('Please type something first')
  }
  let storyData ={
  story_text:text,
  story_type:'Text',
  story_value:'',
  story_background:bgColor
  }
  //send the request
  let response = await axiosInstance.post('/api/v1/stories/create',storyData);
  if(response.status === 200){
    alert('Story uploaded successfully');
    setText("")
  }else{
    console.error(response.data.message)
  }
  }

  return(
    <>
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-[unset]">
    {/* the story info form */}
    <div className="sm:w-[450px] w-[100%] flex items-center flex-col gap-5">
    <div className="w-[100%] h-[300px] px-2 sm:px-6 flex items-center justify-center sm:rounded-md " style={{backgroundColor:bgColor}}>
    <h3 className="text-white text-center font-[rubik-bold]">{text?text:'Type your story text'}</h3>
    </div>
    {/* the text input cont */}
    <textarea value={text} onChange={(e)=>setText(e.target.value)} className="w-full outline-none border-none bg-[#efefef] p-3 rounded-md" placeholder="type your story text here"/>
    <button onClick={()=>uploadStory()} className="cursor-pointer max-w-[150px] text-sm font-[rubik-light] text-white py-2 px-5 rounded-md bg-[#773ee0]">Upload story</button>
    </div>
    {/* the themes */}
    <hr className="border-none outline-none h-[1px] bg-gray-200 sm:hidden"/>
    <div className="flex sm:flex-col gap-4 justify-between sm:justify-normal sm:px-0 px-3">
    {story_themes.map((item:{id:number,color_value:string},index:number)=>{
      return(
      <div key={index} onClick={()=>setBgColor(item.color_value)} className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer`} style={{backgroundColor:item.color_value}}></div>
      )
    })}
    </div>
    </div>
    </>
  )
}

const CreateStatus = () => {
  //form state
  const [formState,setFormState] = useState("Text");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="w-full h-full">
    {/* the header */}
    <div className="px-2 gap-3 w-full sticky top-0 sm:top-11 bg-white border-solid border-t-[1px] border-b-[1px] items-center border-gray-200 h-[60px] flex flex-row justify-between sm:px-4">
    <h1 className="flex gap-2 items-center font-[rubik-light] font-semibold">
      <div onClick={()=>{
       //show the sidebar first
       dispatch(setShowSideBar(true));
       //navigate to the home/chat
       navigate("/home/chat");
      }} className="bg-[#efefef] sm:hidden rounded-full">
      <BiChevronLeft className="w-7 h-7"/>
      </div>
      Create a story
      </h1>
    {/* the options cont */}
    <div className="flex flex-row items-center gap-7">
    <BiImage onClick={()=>setFormState("Image")} className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer text-[#808080]"/>
    
    <BiSolidVideos className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer text-[#808080]"/>

    <FaTextWidth onClick={()=>setFormState("Text")} className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer text-[#808080]"/>
    </div>
    </div>
    {/* the main cont */}
    <div className="w-full flex h-full justify-center items-center flex-row pt-16 gap-7">
    {formState === "Text"?<CreateTextForm/>:formState==="Image"?<CreateImageForm/>:<></>}
    </div>
    </div>
  )
}

export default CreateStatus;
