const express = require("express");
const Document = require("../models/Document");
const router = express.Router();

// Create new document
router.post("/", async (req, res) => {
  const doc = new Document();
  await doc.save();
  res.json(doc);
});

// Get document by ID
router.get("/:id", async (req, res) => {
  const doc = await Document.findById(req.params.id);
  res.json(doc);
});

module.exports = router;
