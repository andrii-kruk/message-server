import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

import { User } from "../models/index.js";

import { mailService, tokenService } from "./index.js";
import createUserDto from "../dtos/user-dto.js";

import { HttpError } from "../helpers/index.js";

const signUp = async (email, password) => {
  const user = await User.findOne({ email });
  if (user) throw HttpError(409, "Email already in use.");

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationCode = nanoid();

  const newUser = await User.create({ email, password: hashPassword, verificationCode });
  await mailService.sendMail(email, verificationCode);

  const userDto = createUserDto(newUser);
  const tokens = tokenService.generateTokens({ ...userDto });
  await tokenService.saveToken(userDto._id, tokens.refreshToken);

  return { ...tokens, user: userDto };
};

export default {
  signUp,
};
