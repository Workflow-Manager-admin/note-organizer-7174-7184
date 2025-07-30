import React, { useEffect, useState } from 'react';
import './App.css';
import './NotesApp.css';
import TopNav from './components/TopNav';
import Sidebar from './components/Sidebar';
import NoteEditor from './components/NoteEditor';
import NoteView from './components/NoteView';
import { fetchNotes, createNote, updateNote, deleteNote } from './lib/api';

// PUBLIC_INTERFACE
function App() {
  // All notes objects: {id, title, content, tags: [string], updatedAt}
  const [notes, setNotes] = useState([]);
  // null for new, or for current viewing or editing.
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  // Editor mode (view, edit, new)
  const [mode, setMode] = useState('view'); // "view" | "edit" | "new"
  // Sidebar filter/search & selected tags
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState(null);

  // Load all notes
  useEffect(() => {
    updateNotesList();
  }, []);

  // Refresh notes list from backend
  async function updateNotesList() {
    const ns = await fetchNotes();
    setNotes(ns);
  }

  // Called when user selects a note
  function handleSelectNote(noteId) {
    setSelectedNoteId(noteId);
    setMode('view');
  }

  // Called to show new-note editor
  function handleNewNote() {
    setSelectedNoteId(null);
    setMode('new');
  }

  // Called to go to edit mode
  function handleEditNote(noteId) {
    setSelectedNoteId(noteId);
    setMode('edit');
  }

  // Handle deleting a note
  async function handleDeleteNote(noteId) {
    if (!window.confirm('Delete this note?')) return;
    await deleteNote(noteId);
    await updateNotesList();
    setSelectedNoteId(null);
    setMode('view');
  }

  // Called after save of edit or new note
  async function handleSaveNote(noteData, isNew) {
    if (isNew) {
      await createNote(noteData);
    } else {
      await updateNote(noteData.id, noteData);
    }
    await updateNotesList();
    setSelectedNoteId(null);
    setMode('view');
  }

  // Sidebar search & tag filter
  const handleSearch = (q) => setSearchQuery(q);
  const handleTagSelect = (tag) => setTagFilter(tag);
  const handleClearTagFilter = () => setTagFilter(null);

  // Compose filtered notes for sidebar
  let filteredNotes = notes;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredNotes = filteredNotes.filter(
      n =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        (n.tags || []).some(tag => tag.toLowerCase().includes(q))
    );
  }
  if (tagFilter) {
    filteredNotes = filteredNotes.filter(
      n => (n.tags || []).includes(tagFilter)
    );
  }

  // Determine selected note
  const selectedNote = notes.find(n => n.id === selectedNoteId);

  // Gather all tags for sidebar
  const allTags = Array.from(
    new Set(notes.flatMap(n => n.tags || []))
  );

  return (
    <div className="notes-main-app">
      <TopNav accent="#ffb300" title="Notes Organizer" />
      <div className="notes-layout-root">
        <Sidebar
          notes={filteredNotes}
          selectedNoteId={selectedNoteId}
          onSelectNote={handleSelectNote}
          onNewNote={handleNewNote}
          searchQuery={searchQuery}
          onSearch={handleSearch}
          tags={allTags}
          onTagSelect={handleTagSelect}
          tagFilter={tagFilter}
          onClearTagFilter={handleClearTagFilter}
        />
        <main className="main-pane">
          {mode === "new" && (
            <NoteEditor
              note={null}
              onSave={(note) => handleSaveNote(note, true)}
              onCancel={() => { setMode("view"); setSelectedNoteId(null); }}
              accent="#ffb300"
            />
          )}
          {mode === "edit" && selectedNote && (
            <NoteEditor
              note={selectedNote}
              onSave={(note) => handleSaveNote(note, false)}
              onCancel={() => setMode("view")}
              accent="#ffb300"
            />
          )}
          {mode === "view" && selectedNote && (
            <NoteView
              note={selectedNote}
              onEdit={() => handleEditNote(selectedNote.id)}
              onDelete={() => handleDeleteNote(selectedNote.id)}
              accent="#ffb300"
              primary="#1976d2"
              secondary="#424242"
            />
          )}
          {mode === "view" && !selectedNote && (
            <div className="empty-main">
              <p style={{ color: '#ccc' }}>Select a note to view, or create a new note.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
