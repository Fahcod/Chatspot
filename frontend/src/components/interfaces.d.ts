

interface User {
    _id:string,
    fullname:string,
    username:string,
    profile_pic:string,
    email:string,
    phone:number,
    profile_bio:string,
    is_user: boolean,
    is_online:boolean,
    createdAt:string,
    updatedAt:string,
    __v:number
}

interface Group {
    _id:string,
    name:string,
    admin:string,
    icon:string,
    members:array,
    description:string,
    is_user: boolean,
    createdAt:string,
    updatedAt:string,
    __v:number
}

interface Message {
    _id:string,
    sender:any,
    receiver:string,
    text:string,
    image:string,
    message_type:string,
    seen:boolean,
    createdAt:string,
    updatedAt:string,
    __v:number
}

//the custom type for the story owner
type Owner = {
    _id:string,
    username:string,
    profile_pic:string
}

interface Story {
    _id: string,
    owner:Owner,
    story_value: string,
    story_text: string,
    story_type: string,
    story_background: string,
    views: string[],
    createdAt: string,
    updatedAt: string,
    __v: number
}