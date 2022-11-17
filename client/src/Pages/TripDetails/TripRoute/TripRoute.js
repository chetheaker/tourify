import './TripRoute.css';
import StopsList from '../../../Components/StopsList/StopsList';
import { FiEdit } from 'react-icons/fi';
import { useState } from 'react';
import StopInput from '../../../Components/StopInput/StopInput';
import { updateTripRoute } from '../../../Utils/TripService';
import { DragDropContext } from 'react-beautiful-dnd';
import { useNav } from '../../../Hooks/useNav';

function TripRoute({
  tripStops,
  stops,
  setStops,
  id,
  renderToast,
  setTrip,
  isAuth
}) {
  const [isEdit, setIsEdit] = useState(false);
  const routeRef = useNav('route');

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

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return; // destination is null
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return; // if destination is same as source

    const newStops = Array.from(stops);
    const removed = newStops.splice(source.index, 1);
    newStops.splice(destination.index, 0, removed[0]);
    setStops(newStops);
  };

  return (
    <div className={`section ${isEdit ? 'editable' : ''}`}>
      <div id="route" ref={routeRef}>
        <DragDropContext onDragEnd={onDragEnd}>
          <StopsList
            stops={stops}
            setStops={setStops}
            isEdit={isEdit}
            renderToast={renderToast}
          />
        </DragDropContext>
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
      <button className={`icon-container ${isEdit || !isAuth ? 'hidden' : ''}`}>
        <FiEdit color="#fff" size="1.5em" onClick={() => setIsEdit(true)} />
      </button>
    </div>
  );
}

export default TripRoute;
