const jwt = require("jsonwebtoken");
<<<<<<< HEAD
const ApiError = require("../utils/ApiError");

const authenticateUser = (req, res, next) => {
=======

module.exports = function authMiddleware(req, res, next) {
>>>>>>> origin/main
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
<<<<<<< HEAD
    req.user = decoded;
    next();
  } catch (err) {
    return next(new ApiError(401, "Invalid or expired token"));
=======
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
>>>>>>> origin/main
  }
};
