const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors")
const {GoogleGenAI} = require("@google/genai") 


dotenv.config();
const app = express();

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY})

const port = 3000;
app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("api working");
})


app.post("/generate",async (req,res)=>{
    let {input} = req.body;

    const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: input
    })
    const text = response.text;


    res.status(200).json({response: text});
    
    
})
app.listen(port,()=>{
    console.log("listening to port ",port);
})