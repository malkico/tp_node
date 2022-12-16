const User = require("../model/User");
const express = require('express');


const user = express.Router();

user.post("/add", async (req, res) => {
  const user = User(req.body);
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
  });
});


module.exports = user;