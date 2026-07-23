const {
    updateTelemetry,
    getAllTelemetry
} = require("../services/telemetryManager");

const {
    updateScreenshot
} = require("../services/screenshotManager");

const analyzeTelemetry = require("../services/alertEngine");
const calculateFocusScore = require("../services/focusScoreEngine");

//const {
  //  analyzeTelemetry: analyzeWithAI
//} = require("../services/aiService");

const Alert = require("../models/Alert");

// Store the last active window for each student
const previousWindows = new Map();

function registerTelemetrySocket(io, socket) {

    // ==========================
    // TELEMETRY
    // ==========================
    socket.on("telemetry-update", async (data) => {

        console.log("📊 Telemetry Received:", data);

        // Existing functionality
        updateTelemetry(data.studentId, data);

        analyzeTelemetry(data);

        calculateFocusScore(data);

        // Send latest telemetry to faculty
        io.to("faculty").emit("telemetry-updated", {
            studentId: data.studentId,
            activeWindow: data.activeWindow,
            cpu: data.cpu,
            memory: data.memory,
            lastUpdated: new Date().toISOString()
        });

        // =====================================
        // PHASE 6 - Background AI Analysis
        // =====================================

        const lastWindow = previousWindows.get(data.studentId);

        // Only analyze when active window changes
        if (lastWindow !== data.activeWindow) {

            previousWindows.set(
                data.studentId,
                data.activeWindow
            );

            // Run AI asynchronously without blocking telemetry
            (async () => {

                try {

                    const analysis = await analyzeWithAI(data);
                    
                    console.log("===== ANALYSIS OBJECT =====");
                    console.log(analysis);
                    console.log("===========================");
                    await Alert.create({

                        studentId: data.studentId,

                        category: analysis.category,

                        risk: analysis.risk,

                        confidence: analysis.confidence,

                        reason: analysis.reason,

                        recommendation: analysis.recommendation,

                        activeWindow: data.activeWindow

                    });

                    console.log("🤖 AI Alert Stored");

                } catch (error) {

                    console.error(
                        "❌ AI Analysis Error:",
                        error.message
                    );

                }

            })();

        }

    });

    // ==========================
    // SCREENSHOT
    // ==========================
    socket.on("screenshot-update", (data) => {

        console.log("🖼 Screenshot Received");
        console.log("Student:", data.studentId);

        updateScreenshot(
            data.studentId,
            data.image
        );

        io.to("faculty").emit("screenshot-updated", {
            studentId: data.studentId,
            image: data.image,
            updatedAt: new Date().toISOString()
        });

    });

}

module.exports = registerTelemetrySocket;