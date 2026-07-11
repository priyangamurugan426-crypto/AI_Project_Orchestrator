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

        let blueprint = "";

        if (domain === "Healthcare") {

            blueprint = `
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
            <p>Frontend → Node.js Backend → IBM watsonx Orchestrate → MySQL</p>

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
                <li>Patient Management</li>
                <li>Doctor Management</li>
                <li>Appointment Management</li>
            </ul>
            `;

        }

        else if (domain === "E-Commerce") {

            blueprint = `
            <h3>📋 Functional Requirements</h3>
            <ul>
                <li>Customer Registration</li>
                <li>Product Management</li>
                <li>Shopping Cart</li>
                <li>Order Management</li>
                <li>Payment Gateway</li>
                <li>Inventory Management</li>
            </ul>

            <h3>🏗 System Architecture</h3>
            <p>Frontend → Node.js Backend → IBM watsonx Orchestrate → MongoDB</p>

            <h3>🗄 Database Tables</h3>
            <ul>
                <li>Users</li>
                <li>Products</li>
                <li>Orders</li>
                <li>Payments</li>
                <li>Cart</li>
                <li>Inventory</li>
            </ul>

            <h3>🌐 API Modules</h3>
            <ul>
                <li>/users</li>
                <li>/products</li>
                <li>/orders</li>
                <li>/payments</li>
                <li>/cart</li>
            </ul>

            <h3>🎨 UI Screens</h3>
            <ul>
                <li>Home</li>
                <li>Product List</li>
                <li>Product Details</li>
                <li>Shopping Cart</li>
                <li>Checkout</li>
            </ul>
            `;

        }

        else if (domain === "Education") {

            blueprint = `
            <h3>📋 Functional Requirements</h3>
            <ul>
                <li>Student Management</li>
                <li>Teacher Management</li>
                <li>Course Management</li>
                <li>Attendance</li>
                <li>Examinations</li>
                <li>Result Management</li>
            </ul>

            <h3>🏗 System Architecture</h3>
            <p>Frontend → Node.js Backend → IBM watsonx Orchestrate → PostgreSQL</p>

            <h3>🗄 Database Tables</h3>
            <ul>
                <li>Students</li>
                <li>Teachers</li>
                <li>Courses</li>
                <li>Attendance</li>
                <li>Exams</li>
                <li>Results</li>
            </ul>

            <h3>🌐 API Modules</h3>
            <ul>
                <li>/students</li>
                <li>/teachers</li>
                <li>/courses</li>
                <li>/attendance</li>
                <li>/results</li>
            </ul>

            <h3>🎨 UI Screens</h3>
            <ul>
                <li>Student Dashboard</li>
                <li>Teacher Dashboard</li>
                <li>Course Management</li>
                <li>Attendance</li>
                <li>Results</li>
            </ul>
            `;

        }

        else if (domain === "Banking") {

            blueprint = `
            <h3>📋 Functional Requirements</h3>
            <ul>
                <li>Customer Accounts</li>
                <li>Fund Transfer</li>
                <li>Transaction History</li>
                <li>Loan Management</li>
                <li>ATM Services</li>
                <li>Reports</li>
            </ul>

            <h3>🏗 System Architecture</h3>
            <p>Frontend → Node.js Backend → IBM watsonx Orchestrate → Oracle Database</p>

            <h3>🗄 Database Tables</h3>
            <ul>
                <li>Customers</li>
                <li>Accounts</li>
                <li>Transactions</li>
                <li>Loans</li>
                <li>Cards</li>
            </ul>
            `;

        }
            else if (domain === "Finance") {

    blueprint = `
    <h3>📋 Functional Requirements</h3>
    <ul>
        <li>Expense Management</li>
        <li>Income Tracking</li>
        <li>Budget Planning</li>
        <li>Investment Tracking</li>
        <li>Financial Reports</li>
        <li>Tax Management</li>
    </ul>

    <h3>🏗 System Architecture</h3>
    <p>Frontend → Node.js Backend → IBM watsonx Orchestrate → PostgreSQL</p>

    <h3>🗄 Database Tables</h3>
    <ul>
        <li>Users</li>
        <li>Expenses</li>
        <li>Income</li>
        <li>Budgets</li>
        <li>Investments</li>
    </ul>

    <h3>🌐 API Modules</h3>
    <ul>
        <li>/expenses</li>
        <li>/income</li>
        <li>/budgets</li>
        <li>/reports</li>
    </ul>

    <h3>🎨 UI Screens</h3>
    <ul>
        <li>Dashboard</li>
        <li>Expense Tracker</li>
        <li>Income</li>
        <li>Reports</li>
    </ul>
    `;
}
          else if (domain === "AI") {

    blueprint = `
    <h3>📋 Functional Requirements</h3>
    <ul>
        <li>Dataset Management</li>
        <li>Model Training</li>
        <li>Prediction Service</li>
        <li>Model Monitoring</li>
        <li>Analytics Dashboard</li>
    </ul>

    <h3>🏗 System Architecture</h3>
    <p>Frontend → Node.js Backend → IBM watsonx Orchestrate → Python AI Engine</p>

    <h3>🗄 Database Tables</h3>
    <ul>
        <li>Models</li>
        <li>Datasets</li>
        <li>Predictions</li>
        <li>Users</li>
    </ul>

    <h3>🌐 API Modules</h3>
    <ul>
        <li>/models</li>
        <li>/datasets</li>
        <li>/predict</li>
    </ul>

    <h3>🎨 UI Screens</h3>
    <ul>
        <li>Dashboard</li>
        <li>Dataset Upload</li>
        <li>Prediction</li>
        <li>Analytics</li>
    </ul>
    `;
}
  else if (domain === "IoT") {

    blueprint = `
    <h3>📋 Functional Requirements</h3>
    <ul>
        <li>Device Registration</li>
        <li>Sensor Monitoring</li>
        <li>Remote Control</li>
        <li>Alerts</li>
        <li>Analytics Dashboard</li>
    </ul>

    <h3>🏗 System Architecture</h3>
    <p>Frontend → Node.js Backend → IBM watsonx Orchestrate → MQTT Broker</p>

    <h3>🗄 Database Tables</h3>
    <ul>
        <li>Devices</li>
        <li>Sensors</li>
        <li>Alerts</li>
        <li>Users</li>
    </ul>

    <h3>🌐 API Modules</h3>
    <ul>
        <li>/devices</li>
        <li>/sensors</li>
        <li>/alerts</li>
    </ul>

    <h3>🎨 UI Screens</h3>
    <ul>
        <li>Dashboard</li>
        <li>Devices</li>
        <li>Sensors</li>
        <li>Analytics</li>
    </ul>
    `;
}
      else if (domain === "Manufacturing") {

    blueprint = `
    <h3>📋 Functional Requirements</h3>
    <ul>
        <li>Production Planning</li>
        <li>Inventory Management</li>
        <li>Machine Monitoring</li>
        <li>Quality Control</li>
        <li>Employee Management</li>
    </ul>

    <h3>🏗 System Architecture</h3>
    <p>Frontend → Node.js Backend → IBM watsonx Orchestrate → SQL Server</p>

    <h3>🗄 Database Tables</h3>
    <ul>
        <li>Products</li>
        <li>Machines</li>
        <li>Employees</li>
        <li>Inventory</li>
    </ul>

    <h3>🌐 API Modules</h3>
    <ul>
        <li>/products</li>
        <li>/machines</li>
        <li>/inventory</li>
    </ul>

    <h3>🎨 UI Screens</h3>
    <ul>
        <li>Dashboard</li>
        <li>Production</li>
        <li>Inventory</li>
        <li>Machines</li>
    </ul>
    `;
}
          else if (domain === "Government") {

    blueprint = `
    <h3>📋 Functional Requirements</h3>
    <ul>
        <li>Citizen Management</li>
        <li>Complaint Management</li>
        <li>Document Verification</li>
        <li>Department Management</li>
        <li>Report Generation</li>
    </ul>

    <h3>🏗 System Architecture</h3>
    <p>Frontend → Node.js Backend → IBM watsonx Orchestrate → PostgreSQL</p>

    <h3>🗄 Database Tables</h3>
    <ul>
        <li>Citizens</li>
        <li>Departments</li>
        <li>Complaints</li>
        <li>Documents</li>
    </ul>

    <h3>🌐 API Modules</h3>
    <ul>
        <li>/citizens</li>
        <li>/complaints</li>
        <li>/documents</li>
    </ul>

    <h3>🎨 UI Screens</h3>
    <ul>
        <li>Citizen Portal</li>
        <li>Complaint Portal</li>
        <li>Documents</li>
        <li>Dashboard</li>
    </ul>
    `;
}
              
else {

    blueprint = `
    <h3>📋 Functional Requirements</h3>
    <ul>
        <li>User Management</li>
        <li>Authentication</li>
        <li>Dashboard</li>
        <li>Reports</li>
        <li>Notifications</li>
    </ul>

    <h3>🏗 System Architecture</h3>
    <p>Frontend → Node.js Backend → IBM watsonx Orchestrate → Database</p>
    `;
}

        blueprint += `
        <h3>🚀 Deployment</h3>
        <ul>
            <li>Frontend : Vercel</li>
            <li>Backend : Render</li>
            <li>AI Platform : IBM watsonx Orchestrate</li>
        </ul>

        <hr>

        <b>IBM Authentication Successful ✅</b>
        `;

        return res.json({

            success: true,

            message: blueprint,

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
