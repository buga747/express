const { HttpError } = require("../utils/HttpError");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const { asignTokens } = require("../utils/asignTokens");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    return next(new HttpError(401, "Invalid token"));
  }

  let fetchedUser;

  try {
    const decodedPayload = jwt.decode(token);
    fetchedUser = await User.findById(decodedPayload.id);
    if (!fetchedUser || !fetchedUser.refresh_token) {
      return next(
        new HttpError(401, "User is not found or refresh token is unvalid")
      );
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET);

    req.user = fetchedUser;
    next();
  } catch (err) {
    if (err.name !== "TokenExpiredError") {
      return next(new HttpError(401, err.message));
    }

    try {
      jwt.verify(fetchedUser.refresh_token, REFRESH_TOKEN_SECRET);

      const { accessToken, refreshToken } = asignTokens(fetchedUser);
      await User.findByIdAndUpdate(fetchedUser._id, {
        refresh_token: refreshToken,
      });

      res.status(200).json({
        user: {
          _id: fetchedUser._id,
          email: fetchedUser.email,
        },
        accessToken,
      });
    } catch (err) {
      return next(new HttpError(401, "Refresh token is expired"));
    }
  }
};

module.exports = {
  auth,
};
