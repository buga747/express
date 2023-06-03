const express = require("express");
const {
  createUserValidationSchema,
  loginValidationSchema,
} = require("../utils/validation/authValidationSchema");
const { validateBody } = require("../utils/validateBody");
const { signup, login, logout } = require("../controllers/authControllers");
const { auth } = require("../middlawares/auth");

const router = express.Router();
router.post("/signup", validateBody(createUserValidationSchema), signup);
router.post("/login", validateBody(loginValidationSchema), login);
router.post("/logout", auth, logout);

module.exports = {
  authRouter: router,
};
