import './TripItinerary.css';
import { FiEdit } from 'react-icons/fi';
import { useState } from 'react';
import ItineraryList from './ItineraryList/ItineraryList';

function TripItinerary({
  itinerary,
  setItinerary,
  tripItinerary,
  renderToast,
  setTrip
}) {
  const [isEdit, setIsEdit] = useState(false);

  const cancelChanges = () => {
    setItinerary(tripItinerary);
    setIsEdit(false);
  };

  const saveChanges = async () => {
    // update in db
    const updated = { acknowledged: true };
    if (updated.acknowledged) {
      renderToast('Success', 'success', 'Itinerary successfully updated');
      setIsEdit(false);
      setTrip((prev) => ({
        ...prev,
        itinerary: itinerary
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
      <div id="itinerary">
        <ItineraryList itinerary={itinerary} />
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

export default TripItinerary;
