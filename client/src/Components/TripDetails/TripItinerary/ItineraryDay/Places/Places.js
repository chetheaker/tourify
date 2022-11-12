import './Places.css';
import { GrLocation } from 'react-icons/gr';
import { Autocomplete } from '@react-google-maps/api';

function Places({ placesInputActive, places }) {
  return (
    <div className="places">
      {placesInputActive ? (
        <div className="input-container">
          <GrLocation className="icon" />
          <Autocomplete className="auto">
            <input
              type="text"
              className={`places-input ${
                placesInputActive ? 'show-input' : 'hide-input'
              }`}
              placeholder="Add a place..."
            />
          </Autocomplete>
          <button className="add-place input-btn">Add Place</button>
        </div>
      ) : null}
      {places.length ? (
        <div className="places-container">
          {places.map((place, index) => (
            <div className="place" key={index}>
              place
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Places;
