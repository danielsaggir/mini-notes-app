import { useState, useEffect } from "react";
import { fetchNotes, createNote, deleteNote, updateNote } from "./api/notesApi";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import NoteItem from "./components/NoteItem";
import "./App.css";


function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadNotes = async () => {
    try {
      setLoading(true);
      setError("");
  
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error(error.message);
      setError("Failed to load notes");
    } finally {
      setLoading(false);
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
    <div className="app">
      <h1>Mini Notes App</h1>
  
      {loading && <p className="loading">Loading notes...</p>}
  
      {error && <p className="error">{error}</p>}
  
      <NoteForm
        title={title}
        content={content}
        editingNoteId={editingNoteId}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onSubmit={handleSubmit}
        onCancelEdit={() => {
          setEditingNoteId(null);
          setTitle("");
          setContent("");
        }}
      />
  
      <NoteList
        notes={notes}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />
    </div>
  );

export default App;