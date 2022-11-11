import Stop from '../Stop/Stop';
import './StopsList.css';

function StopsList({ stops }) {
  return (
    <div className="stops-list">
      {stops.map((stop) => (
        <Stop stop={stop} key={stop.id} />
      ))}
    </div>
  );
}

export default StopsList;
