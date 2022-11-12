import Stop from '../Stop/Stop';
import './StopsList.css';
import { Droppable } from 'react-beautiful-dnd';

function StopsList({ stops, isEdit, setStops, renderToast }) {
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
