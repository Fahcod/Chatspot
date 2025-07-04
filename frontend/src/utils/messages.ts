
//the function to get the real time
function getRealTime(time:string){
let date = new Date(time);
return date.toLocaleTimeString('en-Us',{
    hour12:true,
    hour:'2-digit',
    minute:'2-digit'
});
}

//get the last chat message
function getLastChatMessage(messages:any[],chat_id:string){
//first find all the messages
let chatMessagesOnly = messages.filter((item)=>{
    return item.receiver === chat_id
});
//get the last message
let lastMessageArray = chatMessagesOnly.slice(-1);
//return the last message `.text`
let messageText = lastMessageArray.map((item)=>{
    return (item.text.slice(0,20) + (item.text.length>10?'...':''));
});

return messageText
}

//get the unseen messages
function getUnreadMessages(messages:Message[],chatId:string):number{
    //find the chat messages
    let chat_messages:Message[] = messages.filter((item:Message)=>{
        return item.sender == chatId;
    });
    //extract the unseen
    let unseen:Message[] = chat_messages.filter((item:Message)=>{
        return item.seen == false
    });
    //return the length
    return unseen.length;
}

export {getRealTime,getLastChatMessage,getUnreadMessages}