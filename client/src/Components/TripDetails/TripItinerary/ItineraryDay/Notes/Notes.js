import './Notes.css';
import { BiNote } from 'react-icons/bi';

function Notes({ notesInputActive, notes }) {
  return (
    <div className="notes">
      {notesInputActive ? (
        <div className="notes-input-container">
          <BiNote className="icon note-icon" />
          {/* <input
            type="text"
            className={`places-input ${
              notesInputActive ? 'show-input' : 'hide-input'
            }`}
            placeholder="Add a note..."
          /> */}
          <textarea className="notes-text"></textarea>
          <button className="add-note input-btn">Add Note</button>
        </div>
      ) : null}
      {notes.length ? (
        <div className="notes-container">
          {notes.map((note, index) => (
            <div className="note" key={index}>
              note
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Notes;
