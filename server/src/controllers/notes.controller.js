const notes =require("../data/notes.data");

const getNotes = (req, res) => {
    res.json(notes);
};

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

module.exports = { getNotes, createNote };