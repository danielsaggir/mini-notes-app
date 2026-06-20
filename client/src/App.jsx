import { useState, useEffect } from "react";
import { fetchNotes, createNote, deleteNote, updateNote } from "./api/notesApi";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);

  const loadNotes = async () => {
    try{
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content");
      return;
    }
    try {
      const newNote = { title, content };
      if (editingNoteId) {
        await updateNote(editingNoteId, {title, content});
        setNotes(notes.map((note) => note.id === editingNoteId ? { ...note, title, content } : note));
        setEditingNoteId(null);
      } else {
        const savedNote = await createNote(newNote);
        setNotes([...notes, savedNote]);
      }
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating note:", error);
    };
  };

    const handleDelete = async (id) => {
      try{
        await deleteNote(id);
        setNotes(notes.filter((note) => note.id !== id));
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }

    const handleEditClick = async (note) => {
      setEditingNoteId(note.id);
      setTitle(note.title);
      setContent(note.content);
    };

    const handleUpdate = async (e) => {
      e.preventDefault();
      if (!title.trim() || !content.trim()) {
        alert("Title and content are required");
        return;
      }
    };
  }

  return (
    <div>
      <h1>Mini Notes App</h1>
      <form onSubmit={handleSubmit}>
        <input 
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">{editingNoteId ? "Update Note" : "Add Note"}</button>
        {editingNoteId && (
          <button 
          type="button"
          onClick={() => {
            setEditingNoteId(null);
            setTitle("");
            setContent("");
          }}>
            Cancel Edit
            </button>
          )}
      </form>
      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => handleEditClick(note)}>Update</button>
          <button onClick={() => handleDelete(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );


export default App;