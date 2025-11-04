import analyse from "../controllers/analysiscontroller.js";
import express from "express";
import getLimiter from "../middlewares/analysislimiter.js";
import {getMulter} from "../middlewares/multer.js";
import { verify } from "../middlewares/verify.js";

const analysisrouter=express.Router();
const ratelimiter=getLimiter();
const upload=getMulter();

analysisrouter.post("/",verify,ratelimiter,upload.single("pdffile"),analyse);

export default analysisrouter;