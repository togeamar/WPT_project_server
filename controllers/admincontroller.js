import scoremodel from "../datamodels/scoremodel.js";


export async function getRecentScore(req,res){
    try{
        const rscore=await scoremodel.find().populate("usermodel","first_name last_name email");
        res.status(200).send(rscore)
    }
    catch(error){
        res.status(400).send(`couldnt get scores`);
        console.log(error);
    }
}