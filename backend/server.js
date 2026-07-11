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

        res.json({

    success:true,

    message:
    "PRIYANGA TEST SUCCESS 12345",

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
