import rateLimit from "express-rate-limit";


export default function getLimiter(){
    const analysisLimiter=rateLimit({
        windowMs:15*60*1000,
        max:10,
        message:'Too many requests from this IP, please try again after 15 minutes',
    });
    return analysisLimiter;
}