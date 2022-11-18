import './Places.css';
import { GrLocation } from 'react-icons/gr';
import { AiOutlineDelete } from 'react-icons/ai';
import { Autocomplete } from '@react-google-maps/api';
import { v4 as uuidv4 } from 'uuid';
import { PlacesProps } from '../../../../../../types/props';
import { FormEvent } from 'react';
import { Place } from '../../../../../../types/models';

function Places({
  placesInputActive,
  places,
  setPlaces,
  setItinerary,
  dayIndex,
  renderToast,
  isAuth
}: PlacesProps) {
  const addPlace = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    type TargetType = EventTarget & {
      place: {
        value: string
      }
    };

    const target = e.target as TargetType;

    if (target.place.value === '') return;
    const newPlace = {
      place: target.place.value,
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
    target.place.value = '';
    renderToast('Success', 'success', 'itinerary updated successfully');
  };

  const deletePlace = (place: Place) => {
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
              {isAuth ? (
                <AiOutlineDelete
                  className="delete-icon"
                  onClick={() => deletePlace(place)}
                />
              ) : null}
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
