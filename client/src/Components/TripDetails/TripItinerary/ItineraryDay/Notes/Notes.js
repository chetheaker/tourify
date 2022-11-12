import './Notes.css';
import { BiNote } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

function Notes({ notesInputActive, notes, setNotes }) {
  const addNote = (e) => {
    e.preventDefault();
    if (e.target.note.value === '') return;
    const newNote = {
      note: e.target.note.value,
      id: uuidv4()
    };
    setNotes((prev) => [...prev, newNote]);
    e.target.note.value = '';
  };

  const deleteNote = (place) => {
    setNotes((prev) => prev.filter((p) => p.id !== place.id));
  };

  return (
    <div className="notes">
      {notes.length ? (
        <div className="notes-container">
          <h1 className="heading">Notes:</h1>
          {notes.map((note, index) => (
            <div className="note" key={index}>
              <div className="left">
                <BiNote className="icon" />
                <h1>{note.note}</h1>
              </div>
              <AiOutlineDelete
                className="delete-icon icon"
                onClick={() => deleteNote(note)}
              />
            </div>
          ))}
        </div>
      ) : null}
      {notesInputActive ? (
        <form className="notes-input-container" onSubmit={addNote}>
          <BiNote className="icon note-icon" />
          <textarea name="note" className="notes-text"></textarea>
          <button className="add-note input-btn">Add Note</button>
        </form>
      ) : null}
    </div>
  );
}

export default Notes;
