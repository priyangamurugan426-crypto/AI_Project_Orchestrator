const form = document.getElementById("projectForm");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    document.getElementById("loading").style.display = "block";

    document.getElementById("result").style.display = "none";

    const projectName = document.getElementById("projectName").value;

    const domain = document.getElementById("domain").value;

    const description = document.getElementById("description").value;

    const response = await fetch("http://localhost:3000/generate", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            projectName,
            domain,
            description
        })

    });

    const data = await response.json();

    document.getElementById("loading").style.display = "none";

    const result = document.getElementById("result");

    result.style.display = "block";

    if (data.success) {

        result.innerHTML = `
            <h2>🚀 Project Blueprint Generated Successfully</h2>

            <p><b>Project:</b> ${projectName}</p>

            <p><b>Domain:</b> ${domain}</p>

            <p>${description}</p>

            <br>

            ${data.message}
        `;

    } else {

        result.innerHTML = `
            <h2>❌ Error</h2>

            <pre>${data.error}</pre>
        `;

    }

});