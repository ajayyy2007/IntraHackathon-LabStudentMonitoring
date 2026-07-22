const { addCommand } = require("../services/commandManager");
const { getStudentById } = require("../services/studentManager");

function registerCommandSocket(io, socket) {

    socket.on("send-command", (command) => {

        console.log("📤 Command Received");
        console.log(command);

        const student = getStudentById(command.studentId);

        if (!student) {

            console.log("❌ Student not found:", command.studentId);

            socket.emit("command-error", {
                success: false,
                message: "Student not connected"
            });

            return;
        }

        addCommand(command);

        io.to(student.socketId).emit("execute-command", command);

        console.log(
            `✅ Command sent to ${student.studentId} (${student.socketId})`
        );

    });

}

module.exports = registerCommandSocket;