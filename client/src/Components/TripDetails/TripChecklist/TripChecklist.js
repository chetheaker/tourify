import './TripChecklist.css';
import { FiEdit } from 'react-icons/fi';

function TripChecklist() {
  return (
    <div id="checklist" className="section">
      CHECKLIST
      <div className="overlay"></div>
      <button className="icon-container">
        <FiEdit color="#fff" size="1.5em" />
      </button>
    </div>
  );
}

export default TripChecklist;
