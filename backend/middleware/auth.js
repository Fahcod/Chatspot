import jwt from "jsonwebtoken";


export const tokenParser = (req,res,next)=>{
    try {
        if (!req.body){
        req["body"]={}
        }
        //extract the token
        const {chtspt:token} = req.cookies;
        //if no token throw an error
        if(!token){
            return res.json({success:false,message:"You are not logged in",loggedIn:false})
        }
        //decode the token
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET);
        //set the token in the body
        req.body.user_id=tokenDecode.id;
        //call the next function
        next();
        
    } catch (error) {
        console.log(error)
        res.json({success:false,loggedIn:false,message:"An error occured"})
    }
}