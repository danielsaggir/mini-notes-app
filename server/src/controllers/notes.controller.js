const notes =require("../data/notes.data");

const getNotes = (req, res) => {
    res.json(notes);
};

module.exports = {
    getNotes,
};