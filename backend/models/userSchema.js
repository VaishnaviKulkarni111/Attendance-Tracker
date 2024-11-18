const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },  // Add fname field
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, default: "User" },
  },
  {
    collection: "Users-AT", 
  }
);

const User = mongoose.model("UserInfo", userSchema);

module.exports = User;