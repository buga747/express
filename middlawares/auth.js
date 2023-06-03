const { User } = require("../models/User");
const { HttpError } = require("../utils/HttpError");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const jwt = require("jsonwebtoken");
const { asignTokens } = require("../utils/asignTokens");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer != "Bearer") {
    return next(new HttpError(401, "Invalid token"));
  }

  let fetchedUser;
  try {
    const decoded = jwt.decode(token);
    fetchedUser = await User.findById(decoded.id);

    if (!fetchedUser || !fetchedUser.refresh_token) {
      return next(new HttpError(401, "User not found or not logged in"));
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = fetchedUser;
    next();
  } catch (error) {
    if (error.name !== "TokenExpiredError") {
      return next(new HttpError(401, error.message));
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
    } catch (error) {
      return next(new HttpError(401, "Refresh token is expired"));
    }
  }
};

module.exports = {
  auth,
};
