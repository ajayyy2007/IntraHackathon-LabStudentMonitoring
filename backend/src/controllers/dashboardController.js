const { getAllStudents } = require("../services/studentManager");
const { getAllTelemetry } = require("../services/telemetryManager");
const { getAllAlerts } = require("../services/alertManager");
const { getAllFocusScores } = require("../services/focusScoreManager");
const getDashboard = (req, res) => {

    const focusScores = getAllFocusScores();
    const students = getAllStudents();
    const telemetry = getAllTelemetry();
    const alerts = getAllAlerts();

    res.status(200).json({

        success: true,

        summary: {

    totalStudents: students.length,

    activeAlerts: alerts.length,

    telemetryCount: telemetry.length,

    averageFocusScore:
        focusScores.length === 0
            ? 0
            : Math.round(
                focusScores.reduce((sum, item) => sum + item.score, 0)
                / focusScores.length
            )

},

students,

telemetry,

alerts,

focusScores

    });

};

module.exports = {
    getDashboard
};