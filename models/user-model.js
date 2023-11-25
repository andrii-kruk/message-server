import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  verify: { type: Boolean, default: false },
  verificationLink: { type: String },
});

export const User = model("User", UserSchema);
