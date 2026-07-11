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

        // IBM Authentication (Token Generation)

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

        // Temporary Project Blueprint Response

        return res.json({

            success: true,

            message: `
            <h3>📋 Functional Requirements</h3>

            <ul>
                <li>Patient Management</li>
                <li>Doctor Management</li>
                <li>Appointment Scheduling</li>
                <li>Billing Management</li>
                <li>Pharmacy Management</li>
                <li>Medical Records</li>
                <li>Reports Generation</li>
            </ul>

            <h3>🏗 System Architecture</h3>

            <p>Frontend → Node.js Backend → IBM watsonx Orchestrate → Database</p>

            <h3>🗄 Database Tables</h3>

            <ul>
                <li>Patients</li>
                <li>Doctors</li>
                <li>Appointments</li>
                <li>Medicines</li>
                <li>Billing</li>
                <li>Medical Records</li>
            </ul>

            <h3>🌐 API Modules</h3>

            <ul>
                <li>/patients</li>
                <li>/doctors</li>
                <li>/appointments</li>
                <li>/billing</li>
                <li>/pharmacy</li>
            </ul>

            <h3>🎨 UI Screens</h3>

            <ul>
                <li>Login</li>
                <li>Dashboard</li>
                <li>Patient Module</li>
                <li>Doctor Module</li>
                <li>Appointment Module</li>
                <li>Billing Module</li>
            </ul>

            <h3>🚀 Deployment</h3>

            <ul>
                <li>Frontend : Vercel</li>
                <li>Backend : Render</li>
                <li>AI Platform : IBM watsonx Orchestrate</li>
            </ul>

            <hr>

            <b>IBM Authentication Successful ✅</b>
            `,

            project: {
                name: projectName,
                domain: domain,
                description: description
            }

        });

    } catch (error) {

        console.log(error.response?.data || error.message);

        res.status(500).json({

            success: false,

            error: error.message

        });

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
