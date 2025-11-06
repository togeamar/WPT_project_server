import {hashSync } from "bcrypt";
import adminmodel from "../datamodels/adminmodel.js";
import scoremodel from "../datamodels/scoremodel.js";

export async function getRecentScore(req,res){
    try{
        const rscore=await scoremodel.find().populate("usermodel","first_name last_name email");
        res.status(200).json(rscore);
    }
    catch(error){
        res.status(400).send(`couldnt get scores`);
        console.log(error);
    }
}

export async function adminSignup(req,res) {
    try{
        req.body.password=hashSync(req.body.password,12);
        const newadmin=await adminmodel.create(req.body);
        res.status(201).json(newadmin);
    }
    catch(error){
        console.log("couldnt add admin",req.body);
        res.status(400).json({ message: error.message });
    }
}

export async function getAdmins(req,res) {
    try{
        const resp=await adminmodel.find();
        res.status(200).json(resp);
    }
    catch(error){
        res.json({message:error.message});
    }
}

export async function deleteAdmin(req,res){
    try{
        const resp=await adminmodel.deleteOne({email:req.body.email});
        res.status(200).json(resp);
    }
    catch(error){
        res.json({message:error.message});
    }
}