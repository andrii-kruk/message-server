import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { authService } from "../service/index.js";

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const userData = await authService.signUp(email, password);
  res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

  res.json(userData);
};
const signIn = async (req, res) => {};
const signOut = async (req, res) => {};
const verify = async (req, res) => {};
const refresh = async (req, res) => {};
const getCurrent = async (req, res) => {
  res.json(["123", "456"]);
};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  signOut: ctrlWrapper(signOut),
  verify: ctrlWrapper(verify),
  refresh: ctrlWrapper(refresh),
  getCurrent: ctrlWrapper(getCurrent),
};
