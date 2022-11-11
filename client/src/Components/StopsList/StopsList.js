import Stop from '../Stop/Stop';
import './StopsList.css';

function StopsList({ stops, isEdit }) {
  return (
    <div className="stops-list">
      {stops.map((stop) => (
        <Stop stop={stop} key={stop.id} isEdit={isEdit} />
      ))}
    </div>
  );
}

export default StopsList;
