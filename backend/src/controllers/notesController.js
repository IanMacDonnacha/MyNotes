import Note from '../models/Note.js';

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error from getAllNotes', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    res.status(200).json(note);
  } catch (error) {
    console.error('Error from getNoteById', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    await newNote.save();
    res.status(201).json({ message: 'Note created successfully' });
  } catch (error) {
    console.error('Error from createNote', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });
    if (!updatedNote) {
      res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    console.error('Error from updateNote', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: "You're note has been deleted!" });
  } catch (error) {
    console.error('Error from updateNote', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
