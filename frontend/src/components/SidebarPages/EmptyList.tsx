
const chats:any[] = [
  {
    profile:'src/assets/g.jpg',
    username:'Fahad coder',
    v:''
  },
  {
    profile:'src/assets/g.jpg',
    username:'Fahad coder',
    v:''
  },
  {
    profile:'src/assets/g.jpg',
    username:'Fahad coder',
    v:''
  },
  {
    profile:'src/assets/g.jpg',
    username:'Fahad coder',
    v:''
  },
]

const EmptyList = () => {
  return (
    <>
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
    </>
  )
}

export default EmptyList;
