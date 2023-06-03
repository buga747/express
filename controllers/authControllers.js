const { catchAsyncWrapper } = require("../utils/catchAsyncWrapper");
const {
  signupService,
  loginService,
  logoutService,
} = require("../services/authServices");

const signup = catchAsyncWrapper(async (req, res, next) => {
  const newUser = await signupService(req.body);
  res.status(201).json(newUser);
});

const login = catchAsyncWrapper(async (req, res, next) => {
  const { user, accessToken } = await loginService(req.body);

  res.status(200).json({ user, accessToken });
});

const logout = catchAsyncWrapper(async (req, res, next) => {
  const userId = req.user._id;

  await logoutService(userId);

  res.status(200).json({ message: "Logout was succesful" });
});

module.exports = {
  signup,
  login,
  logout,
};
