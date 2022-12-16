const Playlist = require("../model/Playlist");
const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;

const playlist = express.Router();

playlist.post("/", async (req, res) => {
  const playlist = Playlist(req.body);
  await playlist.save((err, playlist) => {
    if (err) throw new Error("can't create playlist : " + err);

    return res.status(201).json({
      message: "playlist created ! ",
      playlist: playlist._doc,
    });
  });
});

playlist.get("/", async (req, res) => {
  
  Playlist.find({})
    .select("-__v")
    .populate("user", "-password -__v")
    .exec((err, playlists) => {
       if (err || playlists.length === 0) throw new Error("playlists_notfound : " + err);
      res.status(201).json({ playlists: playlists });
    });
});

module.exports = playlist;
