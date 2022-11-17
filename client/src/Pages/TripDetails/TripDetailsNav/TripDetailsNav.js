import './TripDetailsNav.css';
import { useContext } from 'react';
import { NavContext } from '../../../Context/NavContext';

function TripDetailsNav() {
  const { activeNavLink, setActiveNavLink } = useContext(NavContext);

  const handleClick = (id, scrollId) => {
    setActiveNavLink(id);
    const elementToShow = document.getElementById(scrollId);
    elementToShow.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="trip-nav">
      <button
        onClick={() => handleClick('overview-nav', 'overview')}
        className={`${activeNavLink === 'overview' ? 'active' : ''}`}
        id="overview-nav"
      >
        Overview
      </button>
      <button
        onClick={() => handleClick('route-nav', 'route')}
        className={`${activeNavLink === 'route' ? 'active' : ''}`}
        id="route-nav"
      >
        Route
      </button>
      <button
        onClick={() => handleClick('suggestions-nav', 'suggestions')}
        className={`${activeNavLink === 'suggestions' ? 'active' : ''}`}
        id="suggestions-nav"
      >
        For You
      </button>
      <button
        onClick={() => handleClick('itinerary-nav', 'itinerary')}
        className={`${activeNavLink === 'itinerary' ? 'active' : ''}`}
        id="itinerary-nav"
      >
        Itinerary
      </button>
    </div>
  );
}

export default TripDetailsNav;
