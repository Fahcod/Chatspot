
const chats:any[] = [
  {
    profile:'src/assets/g.jpg',
    username:'Fahad coder',
    v:''
  },
  {
    profile:'src/assets/profile.png',
    username:'Fahad coder',
    v:''
  },
  {
    profile:'src/assets/profile.png',
    username:'Fahad coder',
    v:''
  },
  {
    profile:'src/assets/profile.png',
    username:'Fahad coder',
    v:''
  },
  {
    profile:'src/assets/profile.png',
    username:'Fahad coder',
    v:''
  },
 
]


const Calls = () => {
  return (
    <div className="w-full h-screen">
    <div className="w-full flex items-center py-4">
    <h2 className="font-[rubik-bold] text-xl">Calls</h2>
    </div>
    {/* the chats container */}
    <div className="w-full flex flex-col gap-6 pt-4">
    {chats.map((item,index)=>{
      console.log(item.v)
      return(
        <div className="w-full cursor-pointer flex justify-between" key={index}>
         <div className="flex items-center gap-3">
         <div className="w-10 h-10 bg-[#efefef] rounded-full">
         </div>
         <div>
          <h2 className="bg-[#efefef] h-2 w-36 leading-none font-semibold font-[rubik-light]"></h2>

          <p className="bg-[#efefef] h-2 w-1/2 mt-1 text-sm items-center flex gap-1 text-red-500"></p>
         </div>
         </div>
         <p className="text-[#454545] w-12 h-2 bg-[#efefef] text-xs"></p>
        </div>
      )
    })}
    </div>
    </div>
  )
}

export default Calls;
