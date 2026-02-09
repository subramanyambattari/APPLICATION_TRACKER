let applications = JSON.parse(localStorage.getItem("applications")) || [];

const form = document.getElementById("appForm");
const list = document.getElementById("appList");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const application = {
        company: document.getElementById("company").value,
        role: document.getElementById("role").value,
        stage: document.getElementById("stage").value,
        result: document.getElementById("result").value,
        date: document.getElementById("date").value
    };

    applications.push(application);
    localStorage.setItem("applications", JSON.stringify(applications));

    form.reset();
    renderApplications();
});

function renderApplications() {
    list.innerHTML = "";

    applications.forEach((app, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${app.company}</td>
            <td>${app.role}</td>
            <td>${app.stage}</td>
            <td>${app.result}</td>
            <td>${app.date}</td>
            <td><button class="delete-btn" onclick="deleteApp(${index})">Delete</button></td>
        `;

        list.appendChild(row);
    });

    updateSummary();
}

function deleteApp(index) {
    applications.splice(index, 1);
    localStorage.setItem("applications", JSON.stringify(applications));
    renderApplications();
}

function updateSummary() {
    document.getElementById("total").innerText = applications.length;
    document.getElementById("interviews").innerText =
        applications.filter(a => a.stage === "Interview").length;
    document.getElementById("offers").innerText =
        applications.filter(a => a.stage === "Offer").length;
    document.getElementById("rejections").innerText =
        applications.filter(a => a.stage === "Rejected" || a.result === "Rejected").length;
}

renderApplications();
