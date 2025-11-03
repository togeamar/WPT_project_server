import express from 'express';
import connectDB from './DBconfig/connect-mongo.js';
import dotenv from 'dotenv';
import userrouter from './routes.js/user-routes.js'
import analysisrouter from './routes.js/anayle-route.js';
import cors from 'cors';

dotenv.config()
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    console.log("welcome to server");
    res.send("welcome to server");
})

app.use("/User",userrouter);
app.use("/analyse",analysisrouter);

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`server runnning on port ${port}`));
