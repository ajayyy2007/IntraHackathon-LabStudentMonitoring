const {
    getAllAlerts
} = require("../services/alertManager");

const getAlerts = (req, res) => {
    res.status(200).json({
        success: true,
        alerts: getAllAlerts()
    });
};

module.exports = {
    getAlerts
};