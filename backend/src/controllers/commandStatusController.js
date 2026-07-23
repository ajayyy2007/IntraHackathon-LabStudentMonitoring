const CommandHistory = require("../models/CommandHistory");

const updateCommandStatus = async (commandId, status, message) => {

    try {

        await CommandHistory.findByIdAndUpdate(
            commandId,
            {
                status,
                message
            }
        );

        console.log(`✅ Command ${commandId} updated to ${status}`);

    } catch (error) {

        console.error("❌ Command Status Update Error:", error.message);

    }

};

module.exports = {
    updateCommandStatus
};