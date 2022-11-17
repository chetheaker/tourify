import Stop from '../Stop/Stop';
import './StopsList.css';
import { DroppableProvided, Droppable } from 'react-beautiful-dnd';
import { StopsListProps } from '../../../types/props';
import React from 'react';

function StopsList({ stops, isEdit, setStops, renderToast }: StopsListProps) {
  return (
    <Droppable droppableId="droppable-1">
      {(provided: DroppableProvided) => (
        <div
          className="stops-list"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {stops.map((stop, index) => (
            <Stop
              stop={stop}
              stops={stops}
              setStops={setStops}
              key={stop.id}
              isEdit={isEdit}
              index={index}
              renderToast={renderToast}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default StopsList;
