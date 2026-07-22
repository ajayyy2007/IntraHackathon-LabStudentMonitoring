const { io } = require("socket.io-client");

const socket = io("http://localhost:5000");

socket.on("connect", () => {

    console.log("✅ Connected to Backend");

    socket.emit("register-student", {

        studentId: "PC-01",
        studentName: "Ariya",
        systemName: "LAB-PC-01"

    });

});
setInterval(() => {
    socket.emit("telemetry-update", {
        studentId: "PC-01",
        activeWindow: "Visual Studio Code",
        cpu: 25,
        memory: 40
    });
}, 3000);
socket.on("students-updated", (students) => {

    console.log("\n📋 Connected Students:");
    console.table(students);

});