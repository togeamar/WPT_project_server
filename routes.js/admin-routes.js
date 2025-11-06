import express from "express";
import {  adminSignup, deleteAdmin, getAdmins, getRecentScore } from "../controllers/admincontroller.js";
import { verify } from "../middlewares/verify.js";

const adminrouter=express.Router();

adminrouter.get("/getscore",verify,getRecentScore);

adminrouter.post("/signup",verify,adminSignup);

adminrouter.get("/getadmins",verify,getAdmins);

adminrouter.post("/deleteadmin",verify,deleteAdmin);



export default adminrouter;