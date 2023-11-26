import ctrlWrapper from "../decorators/ctrlWrapper.js";
import createUserDto from "../dtos/user-dto.js";
import User from "../models/user-model.js";
import { authService } from "../service/index.js";

const { CLIENT_URL } = process.env;

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const userData = await authService.signUp(email, password);
  res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

  res.json(userData);
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const userData = await authService.signIn(email, password);
  res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

  res.json(userData);
};

const signOut = async (req, res) => {
  const { refreshToken } = req.cookies;
  await authService.signOut(refreshToken);
  res.clearCookie("refreshToken");

  res.send(204);
};

const verify = async (req, res) => {
  const { verificationCode } = req.params;
  await authService.verify(verificationCode);

  return res.redirect(CLIENT_URL);
};

const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;

  const userData = await authService.refresh(refreshToken);
  res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

  res.json(userData);
};

const getCurrent = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) throw HttpError(404, "User not found.");

  const userDto = createUserDto(user);

  res.json(userDto);
};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  signOut: ctrlWrapper(signOut),
  verify: ctrlWrapper(verify),
  refresh: ctrlWrapper(refresh),
  getCurrent: ctrlWrapper(getCurrent),
};
