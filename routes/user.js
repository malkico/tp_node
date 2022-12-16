const User = require("../model/User");
const express = require("express");
const bcrypt = require("bcrypt");
const user = express.Router();

user.post("/", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = User({ ...req.body, password: hashedPassword });
  await user.save((err, user) => {
    if (err) throw new Error("can't create user" + err);

    return res.status(201).json({
      message: "user created ! ",
      user: user._doc,
    });
  }); 
});

user.get("/", async (req, res) => {
  User.find({}, (err, users) => {
    if (err || users.length === 0) throw new Error("users_notfound" + err);
    res.status(201).json({ users: users });
  }).select("-password -__v");
});

module.exports = user;
