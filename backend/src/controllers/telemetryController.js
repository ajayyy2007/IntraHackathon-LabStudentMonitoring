const {
    getAllTelemetry
} = require("../services/telemetryManager");

const getTelemetry = (req, res) => {
    res.status(200).json({
        success: true,
        telemetry: getAllTelemetry()
    });
};

module.exports = {
    getTelemetry
};