import { HttpError } from "../helpers/index.js";

import { tokenService } from "../service/index.js";

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw HttpError(401);

    const accessToken = authorization.split(" ")[1];
    if (!accessToken) throw HttpError(401);

    const userData = await tokenService.validateAccessToken(accessToken);

    if (!userData) throw HttpError(401);

    req.user = userData;
    next();
  } catch (error) {
    return next(HttpError(401));
  }
};

export default authMiddleware;
