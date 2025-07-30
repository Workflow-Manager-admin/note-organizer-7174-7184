import React from 'react';

// PUBLIC_INTERFACE
function NoteView({ note, onEdit, onDelete, accent, primary, secondary }) {
  return (
    <div className="note-viewer">
      <div className="note-view-header" style={{ borderBottom: `2px solid ${accent}` }}>
        <div className="note-view-title">{note.title || "(Untitled)"}</div>
        <div className="note-actions">
          <button className="mini-btn" title="Edit note" onClick={onEdit} style={{ color: primary }}>✏️ Edit</button>
          <button className="mini-btn" title="Delete note" onClick={onDelete} style={{ color: secondary }}>🗑️ Delete</button>
        </div>
      </div>
      <div className="note-tags-container">
        {note.tags && note.tags.length > 0 &&
          note.tags.map(tag => (
            <span className="note-tag" key={tag}>{tag}</span>
          ))
        }
      </div>
      <div className="note-content-view">
        {(note.content || "").split('\n').map((l, idx) => (
          <p key={idx}>{l}</p>
        ))}
      </div>
      <div className="note-meta">
        <span>
          Last updated: {formatFullDate(note.updatedAt)}
        </span>
      </div>
    </div>
  );
}

function formatFullDate(timestamp) {
  const d = new Date(timestamp);
  return d.toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default NoteView;
