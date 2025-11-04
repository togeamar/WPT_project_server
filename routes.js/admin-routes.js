import express from "express";
import { getRecentScore } from "../controllers/admincontroller.js";
import { verify } from "../middlewares/verify.js";

const adminrouter=express.Router();

adminrouter.get("/getscore",verify,getRecentScore);

export default adminrouter;