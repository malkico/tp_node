const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Playlist = new Schema({
  name: String,
  songs: [{type : Schema.Types.ObjectId, ref : 'Song'}],
  user: {type : Schema.Types.ObjectId, ref : 'User', required : true}
});

module.exports = mongoose.model("Playlist", Playlist);
