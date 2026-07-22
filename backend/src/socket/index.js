const registerStudentSocket = require("./studentSocket");
const registerFacultySocket = require("./facultySocket");
const registerTelemetrySocket = require("./telemetrySocket");
const registerCommandSocket = require("./commandSocket");

function initializeSocket(io) {

    io.on("connection", (socket) => {

    console.log(`⚡ ${socket.id} Connected`);

    registerStudentSocket(io, socket);
    registerFacultySocket(io, socket);
    registerTelemetrySocket(io, socket);
    registerCommandSocket(io, socket);

});

}

module.exports = initializeSocket;