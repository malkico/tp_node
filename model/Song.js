const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Song = new Schema({
title:String,
  url: String,
  rating:  Number,
  artist: {type : Schema.Types.ObjectId, ref : 'User'}
});

module.exports = mongoose.model("Song", Song);
