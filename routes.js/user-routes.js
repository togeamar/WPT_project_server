
import express from 'express';
import { addUser } from '../controllers/usercontroller.js';
const userrouter=express.Router();


userrouter.post("/",addUser);

export default userrouter;