import multer from "multer";

const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,`${file.fieldname}_${Date.now()}_${file.originalname}`)
    }
});

const uploader = multer({storage:storage});

export {uploader}