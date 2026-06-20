function NoteForm({
    title,
    content,
    editingNoteId,
    onTitleChange,
    onContentChange,
    onSubmit,
    onCancelEdit,
  }) {
    return (
      <form className="note-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
  
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
        />
  
        <button type="submit">
          {editingNoteId ? "Update Note" : "Add Note"}
        </button>
  
        {editingNoteId && (
          <button type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </form>
    );
  }
  
  export default NoteForm;