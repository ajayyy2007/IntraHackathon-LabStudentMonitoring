const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
{
    studentId: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    risk: {
        type: String,
        required: true
    },

    confidence: {
        type: Number,
        default: 0
    },

    reason: {
        type: String,
        default: ""
    },

    recommendation: {
        type: String,
        default: ""
    },

    activeWindow: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Alert", alertSchema);