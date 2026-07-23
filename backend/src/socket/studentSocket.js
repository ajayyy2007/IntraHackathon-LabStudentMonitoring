const {
    addStudent,
    removeStudent,
    getAllStudents
} = require("../services/studentManager");

const Student = require("../models/Student");

function registerStudentSocket(io, socket) {

    socket.on("register-student", async (student) => {

        console.log("📥 Student Registration Received");
        console.log(student);

        // Save student
        addStudent(socket.id, student);

        // VERY IMPORTANT
        // Join room using Student ID
        try {

            await Student.findOneAndUpdate(
                { studentId: student.studentId },
                {
                    studentName: student.studentName,
                    systemName: student.systemName,
                    status: "online",
                    lastSeen: new Date()
                },
                {
                    upsert: true,
                    new: true
                }
            );

            console.log("✅ Student saved to MongoDB");

        } catch (error) {

            console.error("❌ MongoDB Student Save Error:", error.message);

        }

        console.log(`✅ Total Students: ${getAllStudents().length}`);

        io.to("faculty").emit(
            "students-updated",
            getAllStudents()
        );

    });

    socket.on("disconnect", async () => {

        const students = getAllStudents();

        const disconnectedStudent = students.find(
            s => s.socketId === socket.id
        );

        if (disconnectedStudent) {

            try {

                await Student.findOneAndUpdate(
                    { studentId: disconnectedStudent.studentId },
                    {
                        status: "offline",
                        lastSeen: new Date()
                    }
                );

            } catch (error) {

                console.error(error.message);

            }

        }

        removeStudent(socket.id);

        io.to("faculty").emit(
            "students-updated",
            getAllStudents()
        );

        console.log(`🔴 Student Disconnected: ${socket.id}`);

    });

}

module.exports = registerStudentSocket;