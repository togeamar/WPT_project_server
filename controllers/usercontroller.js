import { hashSync } from "bcrypt";
import usermodel from "../datamodels/usermodel.js";
import jwt from "jsonwebtoken";

export async function signUp(req,res) {
    try{
        req.body.password=hashSync(req.body.password,12);
        const newuser=await usermodel.create(req.body);
        res.status(201).json(newuser);
    }
    catch(error){
        console.log("couldnt add user");
        res.status(400).json({ message: error.message });
    }
}



export async function Login(req,res){
    try{
        const {email,password} = req.body;
        const user=await usermodel.find({email});
        console.log(user[0].email);
        console.log(email);
        if(user[0].password===password){
            const token=jwt.sign({userid:user[0].id},'wptmini25')
            res.status(201).send({token,message:"logged in successfull"});
        }
        else{
            res.status(401).send("password invalid!");
        }
    }
    catch(error){
        res.status(401).send("user not registered!");
    }
    
}