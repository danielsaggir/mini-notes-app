import { useState, useEffect } from "react";
import { fetchNotes, createNote } from "./api/notesApi";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

    try {
      const newNote = { title, content };
      const savedNote = await createNote(newNote);
      setNotes([...notes, savedNote]);
      setTitle("");
      setContent("");
      await createNote(newNote);
      loadNotes();
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

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

        <button type="submit">Add Note</button>
      </form>
      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;