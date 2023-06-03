const { HttpError } = require("../utils/HttpError");
const { User } = require("../models/User");
const { asignTokens } = require("../utils/asignTokens");
const bcrypt = require("bcryptjs");

const signupService = async (body) => {
  const fetchedUser = await User.findOne({ email: body.email });
  if (fetchedUser) {
    throw new HttpError(409, "Email is already used");
  }

  body.password = await bcrypt.hash(body.password, 12);
  return await User.create(body);
};

const loginService = async (body) => {
  const fetchedUser = await User.findOne({ email: body.email });

  if (!fetchedUser) {
    throw new HttpError(401, "User is not found");
  }

  const isPasswordCorrect = await bcrypt.compare(
    body.password,
    fetchedUser.password
  );

  if (!isPasswordCorrect) {
    throw new HttpError(401, "Email or password is incorrect");
  }

  const { refreshToken, accessToken } = asignTokens(fetchedUser);

  await User.findByIdAndUpdate(fetchedUser._id, {
    refresh_token: refreshToken,
  });

  return {
    user: { _id: fetchedUser._id, email: fetchedUser.email },
    accessToken,
  };
};

const logoutService = async (userId) => {
  await User.findByIdAndUpdate(userId, { refresh_token: null });
};

module.exports = {
  signupService,
  loginService,
  logoutService,
};
