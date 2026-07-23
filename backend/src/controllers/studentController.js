const {
    getAllStudents,
    getStudentCount
} = require("../services/studentManager");

const getStudents = (req, res) => {
    res.status(200).json({
        success: true,
        totalStudents: getStudentCount(),
        students: getAllStudents()
    });
};

module.exports = {
    getStudents
};