const prisma = require("../lib/prisma");

const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getDashboard = asyncHandler(async (req, res) => {

    const totalResumes = await prisma.resume.count({
        where: {
            userId: req.user.id
        }
    });

    const latestResume = await prisma.resume.findFirst({
        where: {
            userId: req.user.id
        },
        orderBy: {
            updatedAt: "desc"
        },
        select: {
            id: true,
            title: true,
            template: true,
            updatedAt: true
        }
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            "Dashboard data fetched successfully",
            {
                totalResumes,
                latestResume
            }
        )
    );

});

module.exports = {
    getDashboard
};