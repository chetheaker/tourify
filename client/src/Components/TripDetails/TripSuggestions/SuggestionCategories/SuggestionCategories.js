import { useState } from 'react';
import './SuggestionCategories.css';
import SuggestedResults from '../SuggestedResults/SuggestedResults';

function SuggestionCategories({
  place,
  directionsResponse,
  itinerary,
  setItinerary
}) {
  const [active, setActive] = useState('tourist_attraction');

  const handleCategoryChange = (category) => {
    setActive(category);
  };

  return (
    <>
      <div className="suggestion-categories">
        <button
          className={`category ${active === 'tourist_attraction' && 'active'}`}
          onClick={() => handleCategoryChange('tourist_attraction')}
        >
          Things To Do
        </button>
        <button
          className={`category ${active === 'parking' && 'active'}`}
          onClick={() => handleCategoryChange('parking')}
        >
          Parking
        </button>
        <button
          className={`category ${active === 'gas_station' && 'active'}`}
          onClick={() => handleCategoryChange('gas_station')}
        >
          Fuel Stations
        </button>
        <button
          className={`category ${active === 'restaurant' && 'active'}`}
          onClick={() => handleCategoryChange('restaurant')}
        >
          Restaurants
        </button>
        <button
          className={`category ${active === 'lodging' && 'active'}`}
          onClick={() => handleCategoryChange('lodging')}
        >
          Hotels
        </button>
      </div>
      <SuggestedResults
        category={active}
        place={place}
        directionsResponse={directionsResponse}
        itinerary={itinerary}
        setItinerary={setItinerary}
      />
    </>
  );
}

export default SuggestionCategories;
