const { addAlert } = require("./alertManager");

const blockedApps = [
    "YouTube",
    "Netflix",
    "Instagram",
    "Facebook",
    "WhatsApp"
];

function analyzeTelemetry(data) {

    if (!data.activeWindow) return;

    const windowTitle = data.activeWindow.toLowerCase();

    blockedApps.forEach((app) => {

        if (windowTitle.includes(app.toLowerCase())) {

            addAlert({
                studentId: data.studentId,
                type: "WARNING",
                severity: "HIGH",
                message: `${app} detected`
            });

        }

    });

}

module.exports = analyzeTelemetry;