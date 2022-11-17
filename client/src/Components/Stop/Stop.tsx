import './Stop.css';
import { GrLocation } from 'react-icons/gr';
import { AiOutlineDelete } from 'react-icons/ai';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { StopProps } from '../../../types/props';
import React from 'react';

function Stop({ setStops, stop, isEdit, index, stops, renderToast }: StopProps) {
  const deleteStop = () => {
    if (stops.length === 2) {
      renderToast('Error', 'error', 'Trip must have at least 2 stops');
      return;
    }
    setStops((prev) => prev.filter((s) => s.id !== stop.id));
  };

  return (
    <Draggable draggableId={stop.id} index={index}>
      {(provided: DraggableProvided) => (
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
