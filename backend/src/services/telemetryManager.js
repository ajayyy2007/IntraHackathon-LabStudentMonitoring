// Stores latest telemetry of each connected student
const telemetry = new Map();

/**
 * Save or update telemetry
 */
function updateTelemetry(studentId, telemetryData) {
    telemetry.set(studentId, {
        ...telemetryData,
        lastUpdated: new Date().toISOString()
    });
}

/**
 * Get telemetry of one student
 */
function getTelemetry(studentId) {
    return telemetry.get(studentId);
}

/**
 * Get telemetry of all students
 */
function getAllTelemetry() {
    return Array.from(telemetry.entries()).map(([studentId, data]) => ({
        studentId,
        ...data
    }));
}

/**
 * Remove telemetry when student disconnects
 */
function removeTelemetry(studentId) {
    telemetry.delete(studentId);
}

module.exports = {
    updateTelemetry,
    getTelemetry,
    getAllTelemetry,
    removeTelemetry
};