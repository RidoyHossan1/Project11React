import express from "express";
import Note from "./../models/Note.js";
import fetchUser from "./../middleware/fetchUser.js";
import { body, validationResult } from "express-validator";
const router = express.Router();

// ROUTE 1: Get All the Notes using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    // const notes = await Note.find({ user: "656d44b521ae3e8c869fd9db" });
    if (notes.length === 0) {
      return res.json({ message: "No notes found for the user." });
    }
    res.json(notes);
  } catch (error) {
    res.json({ error: error.message });
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a Valid Title").isLength({ min: 4 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // If Empty Throw Erorr
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({ title, description, tag, user: req.user.id });
      const saveNote = await note.save();
      res.json(saveNote);
      console.log("Note Saved");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put(
  "/updatenote/:id",
  fetchUser,
  [
    body("title", "Enter a Valid Title").isLength({ min: 4 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // Create a newNote object
      const newNote = {};
      if (title) {
        newNote.title = title;
        newNote.description = description;
        newNote.tag = tag;
      }

      // Find the note to be updated and update it
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ "Success": "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
