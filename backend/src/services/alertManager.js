const alerts = [];

/**
 * Add a new alert
 */
function addAlert(alert) {

    alerts.unshift({
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...alert
    });

    // Keep only the latest 100 alerts
    if (alerts.length > 100) {
        alerts.pop();
    }
}

/**
 * Get all alerts
 */
function getAllAlerts() {
    return alerts;
}

/**
 * Clear alerts
 */
function clearAlerts() {
    alerts.length = 0;
}

module.exports = {
    addAlert,
    getAllAlerts,
    clearAlerts
};