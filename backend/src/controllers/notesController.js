export function getAllNotes(req, res) {
    res.status(201).send("You've got 5 notes");
}

export function createNote(req, res) {
    res.status(201).json({message: "You're note has been created!"});
}

export function updateNote(req, res) {
    res.status(200).json({message: "You're note has been updated!"});
}

export function deleteNote(req, res) {
    res.status(200).json({message: "You're note has been deleted!"});
}

export default {
    getAllNotes: getAllNotes,
    createNote: createNote,
    updateNote: updateNote,
    deleteNote: deleteNote,
}