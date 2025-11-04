import mongoose, { Schema } from "mongoose";
import usermodel from "./usermodel.js";

const scoreschema=new Schema({
    score:{
        type:Number
    },
    usermodel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
        unique: true
    }
});


export default mongoose.model("score",scoreschema,"recent_scores");