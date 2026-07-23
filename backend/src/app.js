const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");
const telemetryRoutes = require("./routes/telemetryRoutes");
const alertRoutes = require("./routes/alertRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const focusRoutes = require("./routes/focusRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const analyticsRoutes = require("./routes/analyticsRoutes");
const commandRoutes = require("./routes/commandRoutes");
const screenshotRoutes = require("./routes/screenshotRoutes");
const authRoutes = require("./routes/authRoutes");
//const aiRoutes = require("./routes/aiRoutes");
const errorHandler = require("./middleware/errorHandler");
//const registerMessageSocket = require("./src/sockets/messageSocket");

const app = express();

app.use(cors());
app.use(express.json());

app.use(errorHandler);
app.use("/api/auth", authRoutes);
//app.use("/api/ai", aiRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/telemetry", telemetryRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/focus", focusRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/commands", commandRoutes);
app.use("/api/screenshots", screenshotRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Lab Monitoring Backend API Running 🚀"
    });
});

app.use(errorMiddleware);

module.exports = app;