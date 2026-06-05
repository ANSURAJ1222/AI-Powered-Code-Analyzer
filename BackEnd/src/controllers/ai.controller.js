const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({
                message: "Code is required"
            });
        }

        const response = await aiService(code);

        res.status(200).json({
            review: response
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};