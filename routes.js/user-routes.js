
import express from 'express';
import { Login, signUp } from '../controllers/usercontroller.js';
import { verify } from '../middlewares/verify.js';
const userrouter=express.Router();


userrouter.post("/signup",signUp);
userrouter.post("/login",Login);

export default userrouter;