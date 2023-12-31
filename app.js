import express from "express";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import "dotenv/config";

import authRouter from "./routes/auth-router.js";

const { CLIENT_URL } = process.env;

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: CLIENT_URL }));

app.use(express.json());
app.use(express.static("public"));

app.use("/api", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
