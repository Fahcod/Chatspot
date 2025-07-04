import { FaCommentDots } from "react-icons/fa6";


const WelcomePage = () => {
  return (
    <div className='w-full h-screen bg-[#fff] border-solid border-t-[1px] border-gray-200 flex items-center justify-center'>
    <div className="flex flex-col gap-2 items-center">
      <FaCommentDots className="w-24 h-24 text-[#b2b6be]"/>
      <h2 className="text-center text-[#b2b6be] font-[rubik-bold]">Select a contact to chat</h2>
    </div>
    </div>
  )
}

export default WelcomePage;
