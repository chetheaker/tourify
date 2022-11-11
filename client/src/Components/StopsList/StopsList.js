import Stop from '../Stop/Stop';
import './StopsList.css';

function StopsList({ stops, isEdit, setStops }) {
  return (
    <div className="stops-list">
      {stops.map((stop) => (
        <Stop stop={stop} setStops={setStops} key={stop.id} isEdit={isEdit} />
      ))}
    </div>
  );
}

export default StopsList;
