import { useDispatch, useSelector } from "react-redux";
import { setShowImageViewer } from "../slices/modalSlice";
import { setViewImage } from "../slices/servicesSlice";


const ImageViewer = () => {

    const dispatch = useDispatch();
    //boolean to show this modal
    const isShow:boolean = useSelector((state:any)=>state.modals.show_image_viewer);
    //get the image
    const selectedImage:string = useSelector((state:any)=>state.services.view_image);
    //get the other chat images
    const chatImages:Array<string> = useSelector((state:any)=>state.services.chat_view_images);
    
  return (
    <div className={`w-full ${isShow?'block':'hidden'} h-screen bg-[#0e0d0dee] fixed top-0 z-[300]`}>
    {/* the header */}
    <div className="w-full flex items-center h-[50px] bg-[#0d0d0efb] justify-between px-6">
    <h2 className="text-[#fff] font-[rubik-bold]">Image viewer</h2>
    <h2 className="text-[#fff] cursor-pointer font-semibold" onClick={()=>dispatch(setShowImageViewer(false))}>CLOSE</h2>
    </div>
    {/* the image container */}
    <div className="w-full h-[90vh] flex items-center justify-center">
    {/* the content */}
    <div className="flex flex-col gap-5">
    <img src={selectedImage} className="w-full max-h-[300] sm:max-h-[350px] sm:w-[auto] sm:max-w-[550px] object-cover"/>
    <div className="flex flex-row items-center gap-5 sm:px-0 px-4">
   {/* map the other chat images */}
     {chatImages.map((item:string,index:number)=>{
      return (
      <img src={item} key={index} onClick={()=>{dispatch(setViewImage(item))}} className={`w-[80px] ${selectedImage === item?'border-solid border-2 border-[#fff] p-0.5':''} sm:w-[90px] h-[90px] sm:h-[100px] rounded-md object-cover cursor-pointer`}/>
      )
    })}
    </div>
    </div>
    </div>
    </div>
  )
}

export default ImageViewer;
