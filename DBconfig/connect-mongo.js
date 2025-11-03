import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export default async function connectDB() {
    try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected"+process.env.GEMINI_API_KEY);
    }
    catch(error){
        console.log(`something went wrong when connecting:-${error}`);
    }
    
}