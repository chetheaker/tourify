import './Places.css';
import { GrLocation } from 'react-icons/gr';
import { AiOutlineDelete } from 'react-icons/ai';
import { Autocomplete } from '@react-google-maps/api';
import { v4 as uuidv4 } from 'uuid';

function Places({
  placesInputActive,
  places,
  setPlaces,
  setItinerary,
  dayIndex,
  renderToast
}) {
  const addPlace = async (e) => {
    e.preventDefault();
    if (e.target.place.value === '') return;
    const newPlace = {
      place: e.target.place.value,
      id: uuidv4()
    };
    setItinerary((prev) => {
      const newItinerary = [];
      for (let i = 0; i < prev.length; i++) {
        if (i === dayIndex) {
          newItinerary.push({
            ...prev[i],
            places: [...places, newPlace]
          });
        } else {
          newItinerary.push(prev[i]);
        }
      }
      return newItinerary;
    });
    setPlaces((prev) => [...prev, newPlace]);
    e.target.place.value = '';
    renderToast('Success', 'success', 'itinerary updated successfully');
  };

  const deletePlace = (place) => {
    setItinerary((prev) => {
      const newItinerary = [];
      for (let i = 0; i < prev.length; i++) {
        if (i === dayIndex) {
          newItinerary.push({
            ...prev[i],
            places: prev[i].places.filter((p) => p.id !== place.id)
          });
        } else {
          newItinerary.push(prev[i]);
        }
      }
      return newItinerary;
    });
    setPlaces((prev) => prev.filter((p) => p.id !== place.id));
    renderToast('Success', 'success', 'itinerary updated successfully');
  };

  return (
    <div className="places">
      {places.length ? (
        <div className="places-container">
          <h1 className="heading">Places:</h1>
          {places.map((place, index) => (
            <div className="place" key={index}>
              <div className="left">
                <GrLocation />
                <h1>{place.place}</h1>
              </div>
              <AiOutlineDelete
                className="delete-icon"
                onClick={() => deletePlace(place)}
              />
            </div>
          ))}
        </div>
      ) : null}
      {placesInputActive ? (
        <form className="input-container" onSubmit={addPlace}>
          <GrLocation className="icon" />
          <Autocomplete className="auto">
            <input
              type="text"
              name="place"
              className={`places-input ${
                placesInputActive ? 'show-input' : 'hide-input'
              }`}
              placeholder="Add a place..."
            />
          </Autocomplete>
          <button type="submit" className="add-place input-btn">
            Add Place
          </button>
        </form>
      ) : null}
    </div>
  );
}

export default Places;
