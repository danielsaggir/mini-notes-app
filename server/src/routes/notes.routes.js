const express = require("express");
const { getNotes, createNote, deleteNote, updateNote } = require("../controllers/notes.controller");

const router = express.Router();

router.get("/", getNotes);
router.post("/", createNote);
router.delete("/:id", deleteNote);
router.put("/:id", updateNote);

module.exports = router;