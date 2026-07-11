require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("ProjectOrchestrator Backend Running!");
});


app.post("/generate", async (req, res) => {

    console.log("🔥 GENERATE API CALLED");

    const { projectName, domain, description } = req.body;

    try {

        // Step 1: Get IBM IAM Token

        const tokenResponse = await axios.post(

            "https://iam.cloud.ibm.com/identity/token",

            new URLSearchParams({

                grant_type:
                "urn:ibm:params:oauth:grant-type:apikey",

                apikey: process.env.IBM_API_KEY

            }).toString(),

            {
                headers:{
                    "Content-Type":
                    "application/x-www-form-urlencoded"
                }
            }

        );


        const accessToken = tokenResponse.data.access_token;


        console.log("✅ IBM Token Generated");


        // Temporary response
        // Later we connect Watsonx Orchestrate agents here

       // Call IBM watsonx Orchestrate Agent

const agentResponse = await axios.post(

    `https://api.au-syd.watson-orchestrate.cloud.ibm.com/instances/f19bf0bb-d264-4ea4-8091-ff2721958262/api/v2/8339cfb4-206d-4340-92a8-e120af52b923/chat/completions`,

    {
        messages: [
            {
                role: "user",
                content:
                `
Generate a complete software project blueprint.

Project Name:
${projectName}

Domain:
${domain}

Description:
${description}

Provide:
1. Requirements
2. System Architecture
3. Database Design
4. API Design
5. UI/UX Design
6. Deployment Plan
                `
            }
        ],
        stream:false
    },

    {
        headers:{
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type":"application/json",
            "Accept":"application/json",
            "X-IBM-ENVIRONMENT-ID": process.env.IBM_ENVIRONMENT_ID
        }
    }

);


res.json({

    success:true,

    message:
    agentResponse.data,

    project:{
        name: projectName,
        domain: domain,
        description: description
    }

});


    } catch(error){


        console.log(
            error.response?.data || error.message
        );


        res.status(500).json({

            success:false,

            error:error.message

        });

    }

});



app.listen(3000, () => {

    console.log("==============================");
    console.log("ProjectOrchestrator Backend Running!");
    console.log("Server: http://localhost:3000");
    console.log(
        "IBM_API_KEY:",
        process.env.IBM_API_KEY ? "Loaded" : "Missing"
    );
    console.log("==============================");

});
