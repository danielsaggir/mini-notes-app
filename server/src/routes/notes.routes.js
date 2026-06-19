const express = require("express");
const { getNotes } = require("../controllers/notes.controller");

const router = express.Router();

router.get("/", getNotes);

module.exports = router;