function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}


function protectPage() {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        window.location.href = "login.html";
        return null;
    }

    return currentUser;
}


function setupLogout() {
    const logoutBtn = document.getElementById("logoutBtn");

    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html?login=true";
    });
}


function displayUser(currentUser) {
    const hiUser = document.getElementById("hiUser");

    if (hiUser && currentUser) {
        hiUser.textContent = `Hi, ${currentUser.name}! 👋`;
    }
}


function getMyApplications(currentUser) {
    const submissions =
        JSON.parse(localStorage.getItem("submissions")) || [];

    return submissions.filter((submission) => {
        return submission.email.toLowerCase() ===
               currentUser.email.toLowerCase();
    });
}


function getStatusInfo(currentStatus) {

    currentStatus = currentStatus || "pending";

    const isStep1Active =
        currentStatus === "pending" ||
        currentStatus === "under review" ||
        currentStatus === "accepted";

    const isStep2Active =
        currentStatus === "under review" ||
        currentStatus === "accepted";

    const isStep3Active =
        currentStatus === "accepted";

    const statusClass =
        currentStatus === "pending"
            ? "status-pending"
            : currentStatus === "under review"
                ? "status-review"
                : currentStatus === "accepted"
                    ? "status-accepted"
                    : "status-rejected";

    return {
        currentStatus,
        isStep1Active,
        isStep2Active,
        isStep3Active,
        statusClass
    };
}


function renderApplications(submissions) {

    const container = document.getElementById("applicationsList");

    if (!container) return;

    if (submissions.length === 0) {
        container.innerHTML = `
            <div class="no-applications">
                <p>You haven't submitted any internship applications yet. 📝</p>
            </div>
        `;
        return;
    }
    container.innerHTML = "";

    submissions.forEach((submission) => {

        const statusInfo = getStatusInfo(submission.status);

        const appHTML = `
            <div class="applicant-card">

                <div class="application-header">
                    <h3>${submission.domain}</h3>

                    <span class="status-badge ${statusInfo.statusClass}">
                        ${statusInfo.currentStatus}
                    </span>
                </div>

                <p>
                    <strong>Applicant:</strong>
                    ${submission.name}
                </p>

                <p>
                    <strong>University:</strong>
                    ${submission.university}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${submission.email}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${submission.phone}
                </p>

                <p>
                    <strong>Submitted:</strong>
                    ${submission.date || "N/A"}
                </p>

                <div class="progress-tracker">

                    <div class="progress-step ${statusInfo.isStep1Active ? "active" : ""}">
                        <span>1</span>
                        <p>Pending</p>
                    </div>

                    <div class="progress-line ${statusInfo.isStep2Active ? "active" : ""}">
                    </div>

                    <div class="progress-step ${statusInfo.isStep2Active ? "active" : ""}">
                        <span>2</span>
                        <p>Under Review</p>
                    </div>

                    <div class="progress-line ${statusInfo.isStep3Active ? "active" : ""}">
                    </div>

                    <div class="progress-step ${statusInfo.isStep3Active ? "active" : ""}">
                        <span>3</span>
                        <p>Accepted</p>
                    </div>

                </div>

            </div>
        `;

        container.innerHTML += appHTML;
    });
}


function initDashboard() {

    const currentUser = protectPage();

    if (!currentUser) return;

    setupLogout();

    displayUser(currentUser);

    const myApplications = getMyApplications(currentUser);

    renderApplications(myApplications);
}


document.addEventListener("DOMContentLoaded", initDashboard);








