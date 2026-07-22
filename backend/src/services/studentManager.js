// Stores all connected students in memory
const students = new Map();

/**
 * Register a new student
 */
function addStudent(socketId, studentData) {
    students.set(socketId, {
        socketId,
        ...studentData,
        connectedAt: new Date().toISOString()
    });
}

/**
 * Remove disconnected student
 */
function removeStudent(socketId) {
    students.delete(socketId);
}

/**
 * Get one student
 */
function getStudent(socketId) {
    return students.get(socketId);
}

/**
 * Get all connected students
 */
function getAllStudents() {
    return Array.from(students.values());
}

/**
 * Number of connected students
 */
function getStudentCount() {
    return students.size;
}
function getStudentById(studentId) {
    return Array.from(students.values()).find(
        student => student.studentId === studentId
    );
}

module.exports = {
    addStudent,
    removeStudent,
    getStudent,
    getAllStudents,
    getStudentCount,
    getStudentById
};