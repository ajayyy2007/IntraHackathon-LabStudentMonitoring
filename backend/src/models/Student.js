const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
{
    studentId: {
        type: String,
        required: true,
        unique: true
    },

    studentName: {
        type: String,
        required: true
    },

    systemName: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["online", "offline"],
        default: "offline"
    },

    lastSeen: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);