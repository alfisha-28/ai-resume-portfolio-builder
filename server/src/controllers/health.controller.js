const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getHealth = asyncHandler(async (req, res) => {

    return res.status(200).json(
        new ApiResponse(
            200,
            "🚀 Server is running successfully"
        )
    );

});

module.exports = {
    getHealth,
};