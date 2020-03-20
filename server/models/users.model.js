const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require("mongoose-unique-validator");
const userSchema = new Schema(
  {
    fname: {
      type: String,
      required: true
    },
    lname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    upwd: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true
  },
  {
    unique: true
  }
);
userSchema.plugin(uniqueValidator);
const User = mongoose.model("User", userSchema);
module.exports = User;
