const {
    addStudent,
    removeStudent,
    getAllStudents
} = require("../services/studentManager");

function registerStudentSocket(io, socket) {

    socket.on("register-student", (student) => {

        console.log("📥 Student Registration Received");
        console.log(student);

        addStudent({
            socketId: socket.id,
            ...student
        });

        console.log(`✅ Total Students: ${getAllStudents().length}`);

        io.to("faculty").emit("students-updated", getAllStudents());

        // ===========================
        // TEMPORARY TEST FOR MEMBER 1
        // ===========================

    });

    socket.on("disconnect", () => {

        removeStudent(socket.id);

        io.to("faculty").emit("students-updated", getAllStudents());

        console.log(`🔴 Student Disconnected: ${socket.id}`);

    });

}

module.exports = registerStudentSocket;