import React, { useState } from 'react';

// PUBLIC_INTERFACE
function NoteEditor({ note, onSave, onCancel, accent }) {
  // If note is null: creating new note
  const isNew = !note;
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");
  const [tagsField, setTagsField] = useState(note && note.tags ? note.tags.join(", ") : "");

  // Validate and save
  function handleSave(e) {
    e.preventDefault();
    const tags = tagsField
      .split(",")
      .map((t) => t.trim())
      .filter((t) => !!t);
    onSave({
      ...(note ? { id: note.id } : {}),
      title: title.trim(),
      content: content,
      tags,
    });
  }

  return (
    <div className="note-editor">
      <form onSubmit={handleSave} className="note-editor-form">
        <input
          className="note-title-input"
          value={title}
          maxLength={60}
          onChange={e => setTitle(e.target.value)}
          placeholder="Note title"
          autoFocus={isNew}
        />
        <textarea
          className="note-content-input"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write your note here..."
          rows={12}
        />
        <input
          className="note-tags-input"
          value={tagsField}
          onChange={e => setTagsField(e.target.value)}
          placeholder="Tags (comma separated)"
        />
        <div className="editor-btn-row">
          <button
            className="accent-btn"
            style={{ background: accent }}
            type="submit"
          >
            {isNew ? "Create note" : "Save"}
          </button>
          <button className="minimal-btn" type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteEditor;
