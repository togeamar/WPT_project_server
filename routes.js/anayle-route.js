import analyse from "../controllers/analysiscontroller.js";
import express, { Router } from "express";
import getLimiter from "../middlewares/analysislimiter.js";
import {getMulter} from "../middlewares/multer.js";

const analysisrouter=express.Router();
const ratelimiter=getLimiter();
const upload=getMulter();

analysisrouter.post("/",ratelimiter,upload.single("pdffile"),analyse);

export default analysisrouter;