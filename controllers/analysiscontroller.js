
import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenAI } from "@google/genai";
import {getMulter} from "../middlewares/multer.js";

const uplaod=getMulter();

const genai=new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
console.log(process.env.GEMINI_API_KEY);
export default async function analyse(req,res) {
    try{
        if(!req.file){
            return res.status(400).send('No file uploaded or file type was incorrect.');
        }

        const buffer=req.file.buffer;
        const base64=buffer.toString('base64');
        const filePart={
            inlineData:{
                data:base64,
                mimeType:'application/pdf',
            },
        };
        const prompt = `Please provide a detailed analysis of a resume in following json format
        overall score should be out of 100 which will be sum of all other criterias
        {
  "overall_score": 0,
  "criteria": [
    {
      "criteria_name": "Structure & Formatting",
      "criteria_score": 0,
      "analysis": "Evaluates layout consistency, readability, section clarity, and overall visual organization."
    },
    {
      "criteria_name": "Grammar, Spelling, and Language Quality",
      "criteria_score": 0,
      "analysis": "Checks for grammar accuracy, spelling errors, tone consistency, and clarity of expression."
    },
    {
      "criteria_name": "Relevance to Target Role",
      "criteria_score": 0,
      "analysis": "Measures how closely the resume content aligns with the job description or industry expectations."
    },
    {
      "criteria_name": "Work Experience Quality",
      "criteria_score": 0,
      "analysis": "Assesses the impact, clarity, and structure of work experience descriptions using action verbs and measurable results."
    },
    {
      "criteria_name": "Achievements & Results",
      "criteria_score": 0,
      "analysis": "Evaluates how effectively measurable accomplishments and outcomes are presented to show value and performance."
    },
    {
      "criteria_name": "Skills (Technical & Soft)",
      "criteria_score": 0,
      "analysis": "Examines balance and relevance of hard and soft skills, including how they are demonstrated in context."
    },
    {
      "criteria_name": "Education & Certifications",
      "criteria_score": 0,
      "analysis": "Reviews accuracy and relevance of academic background, degrees, certifications, and continuous learning."
    },
    {
      "criteria_name": "ATS Compatibility",
      "criteria_score": 0,
      "analysis": "Determines how well the resume structure and keywords align with Applicant Tracking System requirements."
    },
    {
      "criteria_name": "Consistency & Credibility",
      "criteria_score": 0,
      "analysis": "Checks for logical career progression, timeline accuracy, and credibility of experience and titles."
    },
    {
      "criteria_name": "Uniqueness & Personal Branding",
      "criteria_score": 0,
      "analysis": "Evaluates the presence of a personal touch—unique summary, portfolio links, or clear professional identity."
    }
  ]
} dont add newline caracters or anything just give me pure json.`;

        const parts=[{text:prompt},filePart];

        const result=await genai.models.generateContent({
            model:"gemini-2.5-flash",
            contents:parts
        });
        const text=result.candidates[0].content.parts[0].text;
        const cleanedstring=text.replace(/^```json\n/, "").replace(/\n```$/, "");

        const analysisobject=JSON.parse(cleanedstring);
        res.status(201).send(analysisobject);
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
}
console.log(process.env.GEMINI_API_KEY);