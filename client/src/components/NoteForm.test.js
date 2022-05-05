import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NoteForm from './NoteForm';
import userEvent from '@testing-library/user-event';

test('<NoteForm /> updates parent state and calls onSubmit', () => {
  const addNote = jest.fn();

  render(<NoteForm addNote={addNote} />);

  const input = screen.getByPlaceholderText('your note goes here');
  const sendButton = screen.getByText('save');

  userEvent.type(input, 'testing a form...');
  userEvent.click(sendButton);

  expect(addNote.mock.calls).toHaveLength(1);
  expect(addNote.mock.calls[0][0].content).toBe('testing a form...');
});