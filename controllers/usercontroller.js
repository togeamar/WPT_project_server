import { compareSync, hashSync } from "bcrypt";
import usermodel from "../datamodels/usermodel.js";
import jwt from "jsonwebtoken";
import adminmodel from "../datamodels/adminmodel.js";

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
        const user=await usermodel.findOne({email});
        const admin=await adminmodel.findOne({email});

        if(!admin && !user){
            return res.status(404).json({ message: "User not found" });
        }

        let account;
        let isAdmin = false;

        if (admin) {
            account = admin;
            isAdmin = true;
        } 
        else if (user) {
            account = user;
        }
        
        const validPassword = compareSync(password, account.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }
        
        const token=jwt.sign({userid:account.id,type: isAdmin ? "admin" : "user"},'wptmini25')
        
        res.status(201).send({token,type: isAdmin ? "admin" : "user",message:"logged in successfull",name:account.first_name,email:account.email});
    }
    catch(error){
        console.log(error);
        res.status(401).send("user not registered!");
    }
    
}