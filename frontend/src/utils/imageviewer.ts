

//the function to set the image array
  export function getChatViewImages(messages:Message[],userId:string,chatId:string):Array<string>{
  //find the messages that belong to  the user and the chat
  let chatMessages = messages.filter((item:Message)=>{
    return item.sender._id === chatId && item.receiver === userId || item.sender._id === userId && item.receiver === chatId
  });
  //get only the image messages
  let imageMessages = chatMessages.filter((item:Message)=>{
    return  item.message_type === 'image'
  });
  //return the images as an array
  const imageCollection = imageMessages.map((item:Message)=>{
  return item.image
  });
   //return the images
  return imageCollection
  }