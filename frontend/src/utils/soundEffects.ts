

//function to play audio when a message is sent
function playMessageSent(){
let audioElem:any= document.getElementById('sent');
//lower the volume first
audioElem.volume=0.1
audioElem.play()
}

//function to play audio when a message is sent
function playMessageReceived(){
let audioElem:any= document.getElementById('received');
//lower the volume first
audioElem.volume=0.1
audioElem.play()
}

export {playMessageSent,playMessageReceived}
