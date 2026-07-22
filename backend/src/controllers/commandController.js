const { getCommands } = require("../services/commandManager");

const getAllCommands = (req, res) => {

    res.status(200).json({
        success: true,
        commands: getCommands()
    });

};

module.exports = {
    getAllCommands
};