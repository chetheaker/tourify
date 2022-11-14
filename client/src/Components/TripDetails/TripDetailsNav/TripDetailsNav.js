import './TripDetailsNav.css';
import { useContext } from 'react';
import { NavContext } from '../../../Context/NavContext';

function TripDetailsNav() {
  const [active, setActive] = useContext(NavContext);

  const handleClick = (id, scrollId) => {
    setActive(id);
    console.log(document.getElementById(scrollId));
    document.getElementById(scrollId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="trip-nav">
      <button
        onClick={() => handleClick('overview-nav', 'overview')}
        className={`${active === 'overview-nav' ? 'active' : ''}`}
        id="overview-nav"
      >
        Overview
      </button>
      <button
        onClick={() => handleClick('route-nav', 'route')}
        className={`${active === 'route-nav' ? 'active' : ''}`}
        id="route-nav"
      >
        Route
      </button>
      <button
        onClick={() => handleClick('suggestions-nav', 'suggestions')}
        className={`${active === 'suggestions-nav' ? 'active' : ''}`}
        id="suggestions-nav"
      >
        For You
      </button>
      <button
        onClick={() => handleClick('itinerary-nav', 'itinerary')}
        className={`${active === 'itinerary-nav' ? 'active' : ''}`}
        id="itinerary-nav"
      >
        Itinerary
      </button>
    </div>
  );
}

export default TripDetailsNav;
