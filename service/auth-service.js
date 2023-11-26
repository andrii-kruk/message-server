import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

import { User } from "../models/index.js";

import { mailService, tokenService } from "./index.js";
import createUserDto from "../dtos/user-dto.js";

import { HttpError } from "../helpers/index.js";

const { API_URL } = process.env;

const signUp = async (email, password) => {
  const user = await User.findOne({ email });
  if (user) throw HttpError(409, "Email already in use.");

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationCode = nanoid();

  const newUser = await User.create({ email, password: hashPassword, verificationCode });
  await mailService.sendMail(email, `${API_URL}/verify/${verificationCode}`);

  const userDto = createUserDto(newUser);
  const tokens = tokenService.generateTokens({ ...userDto });
  await tokenService.saveToken(newUser._id, tokens.refreshToken);

  return { ...tokens, user: userDto };
};

const signIn = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw HttpError(400, "Email or password invalid.");

  const isPassEquals = await bcrypt.compare(password, user.password);
  if (!isPassEquals) throw HttpError(400, "Email or password invalid.");

  const userDto = createUserDto(user);

  const tokens = tokenService.generateTokens({ ...userDto });
  await tokenService.saveToken(user._id, tokens.refreshToken);

  return { ...tokens, user: userDto };
};

const signOut = async (refreshToken) => {
  const token = await tokenService.removeToken(refreshToken);
  return token;
};

const verify = async (verificationCode) => {
  const user = await User.findOne({ verificationCode });
  if (!user) throw HttpError(404, "User not found.");

  user.verify = true;
  await user.save();
};

const refresh = async (refreshToken) => {
  if (!refreshToken) throw HttpError(401);

  const userData = tokenService.validateRefreshToken(refreshToken);
  const existToken = await tokenService.findToken(refreshToken);

  if (!userData || !existToken) throw HttpError(401);

  const user = await User.findById(userData.id);

  const userDto = createUserDto(user);

  const tokens = tokenService.generateTokens({ ...userDto });
  await tokenService.saveToken(user._id, tokens.refreshToken);

  return { ...tokens, user: userDto };
};

export default {
  signUp,
  signIn,
  signOut,
  verify,
  refresh,
};
