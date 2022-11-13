import { useState } from 'react';
import './SuggestionCategories.css';
import SuggestedResults from '../SuggestedResults/SuggestedResults';

function SuggestionCategories({ place, directionsResponse }) {
  const [active, setActive] = useState('things to do');

  const handleCategoryChange = (category) => {
    setActive(category);
  };

  return (
    <>
      <div className="suggestion-categories">
        <button
          className={`category ${active === 'things to do' && 'active'}`}
          onClick={() => handleCategoryChange('things to do')}
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
          className={`category ${active === 'fuel stations' && 'active'}`}
          onClick={() => handleCategoryChange('fuel stations')}
        >
          Fuel Stations
        </button>
        <button
          className={`category ${active === 'restaurants' && 'active'}`}
          onClick={() => handleCategoryChange('restaurants')}
        >
          Restaurants
        </button>
        <button
          className={`category ${active === 'hotels' && 'active'}`}
          onClick={() => handleCategoryChange('hotels')}
        >
          Hotels
        </button>
      </div>
      <SuggestedResults
        category={active}
        place={place}
        directionsResponse={directionsResponse}
      />
    </>
  );
}

export default SuggestionCategories;
