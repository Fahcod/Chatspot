import { Outlet } from "react-router-dom";


const MainContainer = () => {
  return (
    <div className="w-full sm:w-[70%] sm:ml-[30%] h-full">
    <Outlet/>
    </div>
  )
}

export default MainContainer;
