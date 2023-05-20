const { HttpError } = require("../utils/HttpError");
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");

const signupService = async (body) => {
  const fetchedUser = await User.findOne({ email: body.email });
  if (fetchedUser) {
    throw new HttpError(409, "Email is already used");
  }

  body.password = await bcrypt.hash(body.password, 12);
  return await User.create(body);
};

const loginService = () => {};

const logoutService = () => {};

module.exports = {
  signupService,
  loginService,
  logoutService,
};
