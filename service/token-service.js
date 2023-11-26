import jwt from "jsonwebtoken";
import { Token } from "../models/index.js";

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: "30m" });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "30d" });

  return { accessToken, refreshToken };
};

const validateAccessToken = async (token) => {
  const userData = jwt.verify(token, JWT_ACCESS_SECRET);

  return userData;
};

const validateRefreshToken = async (token) => {
  const userData = jwt.verify(token, JWT_REFRESH_SECRET);

  return userData;
};

const saveToken = async (userId, refreshToken) => {
  const tokenData = await Token.findOne({ user: userId });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }

  const token = await Token.create({ user: userId, refreshToken });
  return token;
};

const removeToken = async (refreshToken) => {
  const tokenData = await Token.deleteOne({ refreshToken });
  return tokenData;
};

const findToken = async (refreshToken) => {
  const tokenData = await Token.findOne({ refreshToken });
  return tokenData;
};

export default {
  generateTokens,
  validateAccessToken,
  validateRefreshToken,
  saveToken,
  removeToken,
  findToken,
};
