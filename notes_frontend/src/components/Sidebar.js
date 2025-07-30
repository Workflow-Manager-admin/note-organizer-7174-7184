import React from 'react';

// PUBLIC_INTERFACE
function Sidebar({
  notes,
  selectedNoteId,
  onSelectNote,
  onNewNote,
  searchQuery,
  onSearch,
  tags,
  onTagSelect,
  tagFilter,
  onClearTagFilter,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <button className="accent-btn" onClick={onNewNote} aria-label="Add new note">+ New</button>
        <input
          className="note-search"
          type="text"
          value={searchQuery}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search notes..."
        />
      </div>
      <div className="sidebar-tags">
        <span className="sidebar-tags-label">Tags:</span>
        <div className="tags-list">
          {tags.length === 0 && <span className="tag none">None</span>}
          {tags.map(tag => (
            <span
              key={tag}
              className={`tag clickable${tagFilter === tag ? ' active-tag' : ''}`}
              onClick={() => onTagSelect(tag)}
              aria-label={`Filter by tag: ${tag}`}
              role="button"
              tabIndex={0}
            >{tag}</span>
          ))}
          {tagFilter &&
            <span className="tag clear-filter" title="Clear tag filter" onClick={onClearTagFilter}>✕</span>
          }
        </div>
      </div>
      <nav className="sidebar-list">
        {notes.length === 0 ? (
          <p className="sidebar-empty">No notes found.</p>
        ) : (
          notes.map(n =>
            <div
              key={n.id}
              className={`sidebar-note${selectedNoteId === n.id ? ' selected' : ''}`}
              onClick={() => onSelectNote(n.id)}
              tabIndex={0}
              aria-label={`Open note: ${n.title}`}
            >
              <div className="note-title-sidebar">{n.title || "(Untitled)"}</div>
              {n.tags && n.tags.length > 0 &&
                <div className="note-tags-sidebar">
                  {n.tags.map(tag => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
              }
              <div className="note-date-sm">{formatSidebarDate(n.updatedAt)}</div>
            </div>
          )
        )}
      </nav>
    </aside>
  );
}

// Helper: natural date, short.
function formatSidebarDate(timestamp) {
  const d = new Date(timestamp);
  return d.toLocaleDateString(undefined, {month: 'short', day: 'numeric'});
}

export default Sidebar;
