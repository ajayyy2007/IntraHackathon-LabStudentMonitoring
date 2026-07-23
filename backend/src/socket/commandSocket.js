const { addCommand } = require("../services/commandManager");
const {
    getStudentById,
    getAllStudents
} = require("../services/studentManager");

const CommandHistory = require("../models/CommandHistory");

const {
    updateCommandStatus
} = require("../controllers/commandStatusController");

function registerCommandSocket(io, socket) {

    // ==========================================
    // SEND COMMAND TO STUDENT
    // ==========================================

    socket.on("send-command", async (command) => {

        console.log("📤 Command Received:", command);

        let savedCommand = null;

        try {

            savedCommand = await CommandHistory.create({

                teacherId: command.teacherId || null,

                studentId: command.studentId,

                commandType: command.commandType,

                commandData: command,

                status: "PENDING"

            });

            console.log("✅ Command stored in MongoDB");

        } catch (error) {

            console.error("❌ Command Save Error:", error.message);

        }

        const student = getStudentById(command.studentId);

        console.log("===== ALL STUDENTS =====");
        console.log(getAllStudents());
        console.log("========================");

        console.log("🎯 Student Found:", student);

        if (!student) {

            console.log("❌ Student not found:", command.studentId);
            return;

        }

        console.log("📡 Socket ID:", student.socketId);

        // Attach MongoDB command id
        if (savedCommand) {

            command.commandId = savedCommand._id.toString();

        }

        io.to(student.socketId).emit("execute-command", command);

        console.log("✅ execute-command emitted");

    });

    // ==========================================
    // RECEIVE COMMAND STATUS FROM PYTHON AGENT
    // ==========================================

    socket.on("command-status", async (data) => {

        console.log("📥 Command Status Received:", data);

        await updateCommandStatus(

            data.commandId,
            data.status,
            data.message

        );

    });

}

module.exports = registerCommandSocket;