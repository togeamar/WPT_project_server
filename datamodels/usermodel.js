import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
    },
    last_name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    DOB:{
        type:Date,
        required: true,
        default:Date.now,
    },
    password:{
        type:String,
        required: true,
    },
});

export default mongoose.model("User",userSchema,"user");