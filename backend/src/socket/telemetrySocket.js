const {
    updateTelemetry,
    getAllTelemetry
} = require("../services/telemetryManager");
const {
    updateScreenshot
} = require("../services/screenshotManager");


const analyzeTelemetry = require("../services/alertEngine");
const calculateFocusScore = require("../services/focusScoreEngine");

function registerTelemetrySocket(io, socket) {

    socket.on("telemetry-update", (data) => {

        console.log("📊 Telemetry Received:", data);

        updateTelemetry(data.studentId, data);

        // 👇 These are the important lines
        console.log("📦 Stored Telemetry:");
        console.log(getAllTelemetry());
        socket.on("screenshot-update", (data) => {

    console.log("🖼 Screenshot Received");
    console.log("Student:", data.studentId);
    console.log("Image Length:", data.image.length);

    updateScreenshot(data.studentId, data.image);

    // Send latest screenshot to faculty dashboard
    io.to("faculty").emit("screenshot-updated", {
        studentId: data.studentId,
        image: data.image,
        updatedAt: new Date().toISOString()
    });

});

        analyzeTelemetry(data);
        calculateFocusScore(data);

        io.to("faculty").emit("telemetry-updated", getAllTelemetry());

    });

}

module.exports = registerTelemetrySocket;