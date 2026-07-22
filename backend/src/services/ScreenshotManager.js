const screenshots = new Map();

function updateScreenshot(studentId, image) {

    screenshots.set(studentId, {
        studentId,
        image,
        updatedAt: new Date().toISOString()
    });

}

function getScreenshot(studentId) {
    return screenshots.get(studentId) || null;
}

function getAllScreenshots() {
    return Array.from(screenshots.values());
}

function removeScreenshot(studentId) {
    screenshots.delete(studentId);
}

module.exports = {
    updateScreenshot,
    getScreenshot,
    getAllScreenshots,
    removeScreenshot
};