const express = require("express");
const { getNotes, createNote } = require("../controllers/notes.controller");

const router = express.Router();

router.get("/", getNotes);
router.post("/", createNote);

module.exports = router;