import './TripRoute.css';
import StopsList from '../../StopsList/StopsList';
import { FiEdit } from 'react-icons/fi';
import { useState } from 'react';
import StopInput from '../../StopInput/StopInput';

function TripRoute({ tripStops, stops, setStops }) {
  const [isEdit, setIsEdit] = useState(false);

  const cancelChanges = () => {
    setStops(tripStops);
    setIsEdit(false);
  };

  const saveChanges = () => {
    // RECALL Directions Service
    // Update Trip
    setIsEdit(false);
  };

  return (
    <div className={`section ${isEdit ? 'editable' : ''}`}>
      <div id="route">
        <StopsList stops={stops} isEdit={isEdit} />
        <StopInput isEdit={isEdit} setStops={setStops} />
        <div className={`buttons ${isEdit ? 'show-btns' : 'hide-btns'}`}>
          <button className="cancel-changes" onClick={cancelChanges}>
            Cancel Changes
          </button>
          <button className={`save-changes`} onClick={saveChanges}>
            Save Changes
          </button>
        </div>
      </div>
      <div className={`overlay ${isEdit ? 'hidden' : ''}`}></div>
      <button className={`icon-container ${isEdit ? 'hidden' : ''}`}>
        <FiEdit color="#fff" size="1.5em" onClick={() => setIsEdit(true)} />
      </button>
    </div>
  );
}

export default TripRoute;
