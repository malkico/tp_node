const Song = require("../model/Song");
const User = require("../model/User");
const ObjectId = require("mongoose").Types.ObjectId;

const express = require("express");

const song = express.Router();

song.post("/", async (req, res) => {
  User.findById(req.body.artist, async (err, artist) => {
    if (err || !artist) throw new Error("playlist_notfound" + err);

    if (artist._doc.role !== 1) throw new Error("user it's not an artist");

    const song = Song(req.body);
    await song.save((err, result) => {
      if (err) throw new Error("can't create song" + err);

      return res.status(201).json({
        message: "song created ! ",
        song: result._doc,
      });
    });
  });
});

song.get("/", async (req, res) => {
  Song.find({}, (err, results) => {
    if (err || results.length === 0) throw new Error("songs_notfound" + err);
    res.status(201).json({ songs: results });
  }).select(" -__v");
});

song.get("/:id", async (req, res) => {
  Song.findById(req.params.id)
    .select("-password -__v")
    .populate("artist", "-password -__v")
    .exec((err, song) => {
      if (err || !song) throw new Error("song_notfound : " + err);
      res.status(201).json({ song: song });
    });
});

song.delete("/:id", async (req, res) => {
  Song.deleteOne({ _id: ObjectId(req.params.id) }, (err, result) => {
    if (err) throw new Error("can't delete song :" + err);
    res.status(201).json({
      message: "delete_succesful",
      count_deleted: result.deletedCount,
    });
  });
});

song.put("/:id", async (req, res) => {
  Song.updateOne({ _id: ObjectId(req.params.id) }, req.body, {}, (err) => {
    if (err) throw new Error("cant_update_song:" + err);
    else
      res.status(201).json({
        message: "update_succesful",
      });
  });
});

module.exports = song;
