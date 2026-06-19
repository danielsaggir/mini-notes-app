const express = require("express");
const cors = require("cors");
const notesRoutes = require("./routes/notes.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/notes", notesRoutes);

module.exports = app;