const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const authenticateUser = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new ApiError(401, "Access token is missing"));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        next(new ApiError(401, "Invalid or expired token"));
    }
};

module.exports = authenticateUser;