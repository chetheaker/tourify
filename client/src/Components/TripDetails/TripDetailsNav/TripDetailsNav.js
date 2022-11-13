import './TripDetailsNav.css';
import { useState } from 'react';

function TripDetailsNav() {
  const [active, setActive] = useState('overview');

  return (
    <div id="trip-nav">
      <button
        onClick={() => setActive('overview')}
        className={`${active === 'overview' ? 'active' : ''}`}
      >
        Overview
      </button>
      <button
        onClick={() => setActive('route')}
        className={`${active === 'route' ? 'active' : ''}`}
      >
        Route
      </button>
      <button
        onClick={() => setActive('suggestions')}
        className={`${active === 'suggestions' ? 'active' : ''}`}
      >
        For You
      </button>
      <button
        onClick={() => setActive('itinerary')}
        className={`${active === 'itinerary' ? 'active' : ''}`}
      >
        Itinerary
      </button>
    </div>
  );
}

export default TripDetailsNav;
