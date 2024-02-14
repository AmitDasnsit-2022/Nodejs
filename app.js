import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import logger from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import connection from "./database/index.js";
import indexRouter from "./src/index.js";
// import aws from "aws-sdk";
import fileUpload from "express-fileupload";
// import rateLimit from "express-rate-limit";

import { globalErrorHandler } from "./Error/globalError.js";
import { BaseError } from "./Error/BaseError.js";

dotenv.config();

// aws.config.update({
//   region: process.env.region,
//   accessKeyId: process.env.aws_access_key_id,
//   secretAccessKey: process.env.aws_secret_access_key,
// });
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10 minutes
//   limit: 6000,
//   message: "You have exceeded the 100 requests in 15 minutes limit!",
// });
// const s3 = new aws.S3();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
var app = express();
connection();
// app.use(limiter);
app.use(cors());
app.use(fileUpload());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "hls_files")));

// To handle global routes in single file
app.use("/api", indexRouter);

// @response for incorrect routes
app.all("*", (req, res) => {
  res.status(404).json({ error: "route doesnt exist" });
});

process.on("uncaughtException", (err) => {
  // console.log(err);
});

process.on("unhandledRejection", (err) => {
  if (err) {
    console.log(err)
    throw new BaseError(500, "failed", err.message);
  }
});
// Gloabl Error Handler
app.use(globalErrorHandler);

export default app;
