import jwt from 'jsonwebtoken';

export async function verify(req,res,next){
    const authheader=req.get("Authorization");
        if(authheader){
            const token=authheader.split(" ")[1];
            jwt.verify(token,"wptmini25",(error,payload)=>{
                if(error){
               res.status(401).send({message:'Token is invalid'}); 
            }
            else{
                console.log(payload);
                req.loggedInAdminId = payload.userid;
                next(); 
            }
            })
        }
        else{
             res.status(401).send({message:'Token is missing'}); 
        }
}