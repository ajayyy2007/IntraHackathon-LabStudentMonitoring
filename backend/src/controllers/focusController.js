const {
    getAllFocusScores
} = require("../services/focusScoreManager");

const getFocusScores = (req, res) => {

    res.status(200).json({
        success: true,
        focusScores: getAllFocusScores()
    });

};

module.exports = {
    getFocusScores
};