import './Stop.css';
import { GrLocation } from 'react-icons/gr';
import { AiOutlineDelete } from 'react-icons/ai';
import { Draggable } from 'react-beautiful-dnd';

function Stop({ setStops, stop, isEdit, index }) {
  const deleteStop = () => {
    setStops((prev) => prev.filter((s) => s.id !== stop.id));
  };

  return (
    <Draggable draggableId={stop.id} index={index}>
      {(provided) => (
        <div
          className="stop"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="left">
            <GrLocation />
            <h1>{stop.stop}</h1>
          </div>
          <AiOutlineDelete
            className={`${isEdit ? 'show' : 'hide'}`}
            onClick={deleteStop}
          />
        </div>
      )}
    </Draggable>
  );
}

export default Stop;
