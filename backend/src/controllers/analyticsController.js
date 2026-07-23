const Student = require("../models/Student");
const CommandHistory = require("../models/CommandHistory");
const Alert = require("../models/Alert");

const getDashboardAnalytics = async (req, res) => {

    try {

        const studentsOnline = await Student.countDocuments({
            status: "online"
        });

        const studentsOffline = await Student.countDocuments({
            status: "offline"
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const commandsToday = await CommandHistory.countDocuments({
            createdAt: { $gte: today }
        });

        const alertsToday = await Alert.countDocuments({
            createdAt: { $gte: today }
        });

        const highRiskAlerts = await Alert.countDocuments({
            risk: "High"
        });

        const telemetry = require("../services/telemetryManager").getAllTelemetry();

        let avgCPU = 0;
        let avgMemory = 0;

        if (telemetry.length > 0) {

            avgCPU =
                telemetry.reduce((sum, t) => sum + (t.cpu || 0), 0) /
                telemetry.length;

            avgMemory =
                telemetry.reduce((sum, t) => sum + (t.memory || 0), 0) /
                telemetry.length;
        }

        res.json({

            success: true,

            analytics: {

                studentsOnline,

                studentsOffline,

                commandsToday,

                alertsToday,

                highRiskAlerts,

                averageCPU: Number(avgCPU.toFixed(2)),

                averageMemory: Number(avgMemory.toFixed(2))

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    getDashboardAnalytics
};