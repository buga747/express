const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refresh_token: String,
});

// schema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   this.password = await bcrypt.hash(this.password, 12);
// });

const User = model("user", schema);

module.exports = {
  User,
};
