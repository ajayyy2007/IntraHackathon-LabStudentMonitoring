const {
    getScreenshot,
    getAllScreenshots
} = require("../services/screenshotManager");

const getScreenshots = (req, res) => {

    res.status(200).json({
        success: true,
        screenshots: getAllScreenshots()
    });

};

const getStudentScreenshot = (req, res) => {

    const screenshot = getScreenshot(req.params.studentId);

    if (!screenshot) {
        return res.status(404).json({
            success: false,
            message: "Screenshot not found"
        });
    }

    res.status(200).json({
        success: true,
        screenshot
    });

};

module.exports = {
    getScreenshots,
    getStudentScreenshot
};