import { HttpError } from "../helpers/index.js";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

const { JWT_REFRESH_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  const [bearer, accessToken] = authorization.split(" ");
  if (bearer !== "Bearer") throw HttpError(401);
  try {
    const { id } = jwt.verify(accessToken, JWT_REFRESH_SECRET);
    const user = await User.findById(id);

    if (!user || !user.refreshToken) throw HttpError(401);

    req.user = user;
    next();
  } catch (error) {
    throw HttpError(401);
  }
};

export default authMiddleware;
