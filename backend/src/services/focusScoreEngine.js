const {
    productiveApps,
    neutralApps,
    distractingApps
} = require("../config/appCategories");

const {
    updateFocusScore
} = require("./focusScoreManager");

function calculateFocusScore(data) {

    let score = 70;

    const windowTitle = (data.activeWindow || "").toLowerCase();

    if (productiveApps.some(app => windowTitle.includes(app))) {
        score += 25;
    }

    if (neutralApps.some(app => windowTitle.includes(app))) {
        score += 5;
    }

    if (distractingApps.some(app => windowTitle.includes(app))) {
        score -= 40;
    }

    if (data.cpu > 90) {
        score -= 5;
    }

    if (score > 100) score = 100;

    if (score < 0) score = 0;

    updateFocusScore(data.studentId, score);
}

module.exports = calculateFocusScore;