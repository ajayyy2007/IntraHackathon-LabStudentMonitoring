const mongoose = require("mongoose");

const commandHistorySchema = new mongoose.Schema(
{
    teacherId: {
        type: String,
        default: null
    },

    studentId: {
        type: String,
        required: true
    },

    commandType: {
        type: String,
        required: true
    },

    commandData: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },

    status: {
        type: String,
        enum: ["PENDING", "SUCCESS", "FAILED", "TIMEOUT"],
        default: "PENDING"
    },
    message: {
    type: String,
    default: ""
},
},
{
    timestamps: true
});

module.exports = mongoose.model("CommandHistory", commandHistorySchema);