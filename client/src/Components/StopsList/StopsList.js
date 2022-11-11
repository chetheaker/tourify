import Stop from '../Stop/Stop';
import './StopsList.css';
import { Droppable } from 'react-beautiful-dnd';

function StopsList({ stops, isEdit, setStops }) {
  return (
    <Droppable droppableId="droppable-1">
      {(provided) => (
        <div
          className="stops-list"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {stops.map((stop, index) => (
            <Stop
              stop={stop}
              setStops={setStops}
              key={stop.id}
              isEdit={isEdit}
              index={index}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default StopsList;
