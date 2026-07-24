const ApiResponse = require("../utils/ApiResponse");

const asyncHandler = require("../utils/asyncHandler");

const getTemplates = asyncHandler(async (req, res) => {

    const templates = [
        {
            id: "modern",
            name: "Modern",
            color: "#2563EB"
        },
        {
            id: "minimal",
            name: "Minimal",
            color: "#10B981"
        },
        {
            id: "professional",
            name: "Professional",
            color: "#F59E0B"
        },
        {
            id: "creative",
            name: "Creative",
            color: "#EC4899"
        }
    ];

    return res.status(200).json(
        new ApiResponse(
            200,
            "Templates fetched successfully",
            templates
        )
    );

});

module.exports = {
    getTemplates
};