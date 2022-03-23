const express = require("express");
const { createNote } = require("../controllers/notesController");
const router = express.Router({ mergeParams: true });
const { getNotes } = require("../controllers/notesController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getNotes).post(protect, createNote);

module.exports = router;