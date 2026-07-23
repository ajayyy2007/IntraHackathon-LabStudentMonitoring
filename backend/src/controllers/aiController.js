const { analyzeTelemetry } = require("../services/aiService");

const analyze = async (req, res) => {

    try {

        const result = await analyzeTelemetry(req.body);

        res.status(200).json({
            success: true,
            analysis: JSON.parse(result)
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    analyze
};