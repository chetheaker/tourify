import { AiOutlineDelete } from 'react-icons/ai';
import { MdSaveAlt } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { BiNote } from 'react-icons/bi';
import { MutableRefObject, useRef, useState } from 'react';
import { NoteProps } from '../../../../../../../types/props';

function Note({
  note,
  deleteNote,
  setItinerary,
  dayIndex,
  renderToast,
  isAuth
}: NoteProps) {
  const [isEdit, setIsEdit] = useState(false);
  const noteRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

  const handleEditStart = () => {
    setIsEdit(true);
    noteRef.current.focus();
    noteRef.current.setSelectionRange(
      noteRef.current.value.length,
      noteRef.current.value.length
    );
  };

  const handleEditEnd = () => {
    const noteVal = noteRef.current.value;
    setIsEdit(false);

    setItinerary((prev) => {
      const newItinerary = [];
      for (let i = 0; i < prev.length; i++) {
        if (i === dayIndex) {
          const newNotes = prev[i].notes.map((n) => {
            if (n.id === note.id) {
              return {
                ...n,
                note: noteVal
              };
            }
            return n;
          });
          newItinerary.push({
            ...prev[i],
            notes: newNotes
          });
        } else {
          newItinerary.push(prev[i]);
        }
      }
      return newItinerary;
    });
    renderToast('Success', 'success', 'Itinerary updated successfully');
  };

  return (
    <div className="note">
      <div className="left">
        <BiNote className="icon" />
        {!isEdit && <div>{note.note}</div>}
        <textarea
          className={`note-content ${isEdit ? 'show' : 'hide'}`}
          defaultValue={note.note}
          ref={noteRef}
          autoFocus={true}
        />
      </div>
      {isAuth ? (
        <div className="right">
          {!isEdit ? (
            <FiEdit className="icon" onClick={handleEditStart} />
          ) : (
            <MdSaveAlt className="icon" onClick={handleEditEnd} />
          )}
          <AiOutlineDelete
            className="delete-icon icon"
            onClick={() => deleteNote(note)}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Note;
