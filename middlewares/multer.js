import multer from "multer";
const storage=multer.memoryStorage();


export function getMulter(){
    
    const upload=multer({
        storage:storage,
        limits:{
            fileSize:20*1024*1024,
        },
        fileFilter:(req,file,cb)=>{
            if(file.mimetype==='application/pdf'){
                cb(null,true);
            }
            else{
                cb(new Error('Invalid file type. Only PDF is allowed.'), false);
            }
        }
    });
    return upload;
}