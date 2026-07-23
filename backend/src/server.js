require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const initializeSocket = require("./socket");
const connectDB = require("./config/database");

connectDB();

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

initializeSocket(io);

server.listen(PORT, () => {
    console.log(`🚀 Backend Server Running on http://localhost:${PORT}`);
});