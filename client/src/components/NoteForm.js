import React, { useState } from 'react';

const NoteForm = ({ addNote }) => {
  const [newNote, setNewNote] = useState('');

  const handleNoteChange = event => setNewNote(event.target.value);

  const createNote = async (event) => {
    event.preventDefault();

    addNote({
      content: newNote,
      important: false,
    });

    setNewNote('');
  };

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={createNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
          placeholder='your note goes here'
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;