const { getAnalytics } = require("../services/analyticsManager");

const analytics = (req, res) => {

    res.status(200).json({
        success: true,
        analytics: getAnalytics()
    });

};

module.exports = {
    analytics
};