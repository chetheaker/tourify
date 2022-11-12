import './Places.css';
import { GrLocation } from 'react-icons/gr';

function Places({ placesInputActive, places }) {
  return (
    <div className="places">
      {placesInputActive ? (
        <div className="input-container">
          <GrLocation className="icon" />
          <input
            type="text"
            className={`places-input ${
              placesInputActive ? 'show-input' : 'hide-input'
            }`}
            placeholder="Add a place..."
          />
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
