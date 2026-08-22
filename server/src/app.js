const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const routes = require("./routes");

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/api/v1", routes);

const resumeRouter = require("./routes/resume.routes");

app.use("/api/v1/resumes", resumeRouter);

const notFound = require("./middlewares/notFound.middleware");

app.use(notFound);

const errorHandler = require("./middlewares/error.middleware");

app.use(errorHandler);

module.exports = app;

