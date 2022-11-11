import './TripRoute.css';
import StopsList from '../../StopsList/StopsList';
import { FiEdit } from 'react-icons/fi';
import { useState } from 'react';
import StopInput from '../../StopInput/StopInput';
import { updateTripRoute } from '../../../Utils/TripService';

function TripRoute({ tripStops, stops, setStops, id, renderToast, setTrip }) {
  const [isEdit, setIsEdit] = useState(false);

  const cancelChanges = () => {
    setStops(tripStops);
    setIsEdit(false);
  };

  const saveChanges = async () => {
    const updated = await updateTripRoute(id, stops);
    if (updated.acknowledged) {
      renderToast('Success', 'success', 'Route successfully updated');
      // RECALL Directions Service
      setIsEdit(false);
      setTrip((prev) => ({
        ...prev,
        stops: stops
      }));
    } else {
      cancelChanges();
      renderToast(
        'Something went wrong',
        'error',
        'Changes saved unsuccessfully'
      );
    }
  };

  return (
    <div className={`section ${isEdit ? 'editable' : ''}`}>
      <div id="route">
        <StopsList stops={stops} setStops={setStops} isEdit={isEdit} />
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
