const focusScores = new Map();

function updateFocusScore(studentId, score) {
    focusScores.set(studentId, {
        studentId,
        score,
        updatedAt: new Date().toISOString()
    });
}

function getFocusScore(studentId) {
    return focusScores.get(studentId);
}

function getAllFocusScores() {
    return Array.from(focusScores.values());
}

module.exports = {
    updateFocusScore,
    getFocusScore,
    getAllFocusScores
};