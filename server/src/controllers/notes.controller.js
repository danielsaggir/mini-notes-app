const notes =require("../data/notes.data");

//get all notes
const getNotes = (req, res) => {
    res.json(notes);
};

//create note
const createNote = (req, res) => {
    const {title, content} = req.body;

    if (!title || !content) {
        return res.status(400).json({error: "Title and content are required"});
    }

    const newNote = {
        id: Date.now(),
        title,
        content,
    };

    notes.push(newNote);
    res.status(201).json(newNote);
};

//delete note by id
const deleteNote = (req, res) => {
    ///const {id} = req.params;
    const id = Number(req.params.id);
    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex === -1){
        return res.status(404).json({error: "Note not found"});
    }

    notes.splice(noteIndex, 1);
    res.json({message: "Note deleted successfully"});
};

module.exports = { getNotes, createNote, deleteNote };