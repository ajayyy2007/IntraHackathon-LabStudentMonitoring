const {
    addFaculty,
    removeFaculty
} = require("../services/facultyManager");

const {
    getAllStudents
} = require("../services/studentManager");

function registerFacultySocket(io, socket) {

    socket.on("register-faculty", (facultyData) => {

        console.log("👨‍🏫 Faculty Connected");

        addFaculty(socket.id, facultyData);

        socket.join("faculty");

        // Send current students immediately
        socket.emit("students-updated", getAllStudents());

    });

    socket.on("disconnect", () => {

        removeFaculty(socket.id);

    });

}

module.exports = registerFacultySocket;