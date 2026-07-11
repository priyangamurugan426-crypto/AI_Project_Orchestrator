require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("ProjectOrchestrator Backend Running!");
});

// Generate Project API
app.post("/generate", async (req, res) => {

    console.log("🔥 GENERATE API CALLED");

    const { projectName, domain, description } = req.body;

    try {

        // IBM Authentication

        const tokenResponse = await axios.post(

            "https://iam.cloud.ibm.com/identity/token",

            new URLSearchParams({

                grant_type: "urn:ibm:params:oauth:grant-type:apikey",
                apikey: process.env.IBM_API_KEY

            }).toString(),

            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }

        );

        const accessToken = tokenResponse.data.access_token;

        console.log("✅ IBM Token Generated");

        // ===============================
// Call IBM watsonx Orchestrate Agent
// ===============================

const agentResponse = await axios.post(

    `https://api.au-syd.watson-orchestrate.cloud.ibm.com/instances/f19bf0bb-d264-4ea4-8091-ff2721958262/api/v2/${process.env.IBM_AGENT_ID}/chat/completions`,

    {
        messages: [
            {
                role: "user",
                content: `
Project Name:
${projectName}

Domain:
${domain}

Description:
${description}

Generate a professional software project blueprint including:

1. Functional Requirements
2. System Architecture
3. Database Design
4. API Design
5. UI/UX Design
6. Deployment Plan

Return the response in HTML format.
`
            }
        ],
        stream: false
    },

    {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-IBM-ENVIRONMENT-ID": process.env.IBM_ENVIRONMENT_ID
        }
    }

);

// Extract AI Response

const blueprint =
    agentResponse.data.choices?.[0]?.message?.content ||
    "<h3>No response received from IBM watsonx Orchestrate.</h3>";

return res.json({

    success: true,

    message: blueprint,

    project: {

        name: projectName,

        domain: domain,

        description: description

    }

});

// Start Server

app.listen(3000, () => {

    console.log("==============================");
    console.log("ProjectOrchestrator Backend Running!");
    console.log("Server: http://localhost:3000");
    console.log("IBM_API_KEY:", process.env.IBM_API_KEY ? "Loaded" : "Missing");
    console.log("==============================");

});
