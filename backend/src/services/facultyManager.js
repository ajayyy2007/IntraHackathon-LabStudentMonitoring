const faculty = new Map();

function addFaculty(socketId, facultyData) {
    faculty.set(socketId, {
        socketId,
        ...facultyData,
        connectedAt: new Date().toISOString()
    });
}

function removeFaculty(socketId) {
    faculty.delete(socketId);
}

function getAllFaculty() {
    return Array.from(faculty.values());
}

function getFacultyCount() {
    return faculty.size;
}

module.exports = {
    addFaculty,
    removeFaculty,
    getAllFaculty,
    getFacultyCount
};