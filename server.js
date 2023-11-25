import mongoose from "mongoose";
import app from "./app.js";

const { DB_HOST, DB_PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(DB_PORT, () => {
      console.log(`Server running. Use our API on port: ${DB_PORT}.`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
