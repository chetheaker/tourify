import './TripOverview.css';
import { FiEdit } from 'react-icons/fi';

function TripOverview() {
  return (
    <div id="overview" className="section">
      OVERVIEW
      <div className="overlay"></div>
      <button className="icon-container">
        <FiEdit color="#fff" size="1.5em" />
      </button>
    </div>
  );
}

export default TripOverview;
