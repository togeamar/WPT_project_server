import usermodel from "../datamodels/usermodel.js";

export async function addUser(req,res) {
    try{
        const newuser=await usermodel.create(req.body);
        res.status(201).json(newuser);
    }
    catch(error){
        console.log("couldnt add user");
        res.status(400).json({ message: error.message });
    }
}