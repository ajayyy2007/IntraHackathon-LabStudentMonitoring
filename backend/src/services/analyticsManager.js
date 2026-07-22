const { getAllStudents } = require("./studentManager");
const { getAllAlerts } = require("./alertManager");
const { getAllFocusScores } = require("./focusScoreManager");

function getAnalytics() {

    const students = getAllStudents();
    const alerts = getAllAlerts();
    const focusScores = getAllFocusScores();

    const averageFocus =
        focusScores.length === 0
            ? 0
            : Math.round(
                focusScores.reduce((sum, item) => sum + item.score, 0) /
                focusScores.length
            );

    return {

        totalStudents: students.length,

        totalAlerts: alerts.length,

        averageFocus,

        highestFocus:
            focusScores.length > 0
                ? Math.max(...focusScores.map(f => f.score))
                : 0,

        lowestFocus:
            focusScores.length > 0
                ? Math.min(...focusScores.map(f => f.score))
                : 0

    };

}

module.exports = {
    getAnalytics
};