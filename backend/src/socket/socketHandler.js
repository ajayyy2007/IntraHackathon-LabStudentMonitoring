const {
    addStudent,
    removeStudent,
    getAllStudents
} = require("../services/studentManager");

function socketHandler(io) {

    io.on("connection", (socket) => {

        console.log("✅ Client Connected:", socket.id);

        socket.on("register-student", (studentData) => {

            addStudent(socket.id, studentData);

            console.log("Student Registered");

            console.table(getAllStudents());

            io.emit("students-updated", getAllStudents());

        });

        socket.on("disconnect", () => {

            removeStudent(socket.id);

            console.log("Student Disconnected");

            io.emit("students-updated", getAllStudents());

        });

    });

}

module.exports = socketHandler;