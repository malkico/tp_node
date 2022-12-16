const mongoose = require("mongoose")

const {createServer} = require("./utils")
const app = createServer()

const user = 

require('dotenv').config()

// connexion base de donnée
mongoose.connect("mongodb://0.0.0.0:27017/test", {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connection Successful!");
});


app.use("/api/users/", require("./routes/user"))
app.use("/api/playlists/", require("./routes/playlist"))
app.use("/api/songs/", require("./routes/song")) 