//@ts-nocheck
import './Checklists.css';

function Checklists({ checklists, checklistsInputActive }) {
  return (
    <div className="checklists">
      {checklistsInputActive ? (
        <input
          type="text"
          className={`places-input ${
            checklistsInputActive ? 'show-input' : 'hide-input'
          }`}
        />
      ) : null}
      {checklists.length || checklistsInputActive ? (
        <div className="notes-container">
          {checklists.map((list, index) => (
            <div className="note" key={index}>
              checklist
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Checklists;
