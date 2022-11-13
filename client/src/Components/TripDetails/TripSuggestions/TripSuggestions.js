import './TripSuggestions.css';
import { useState } from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { AiFillCaretDown } from 'react-icons/ai';
import SuggestionCategories from './SuggestionCategories/SuggestionCategories';

function TripSuggestions({ stops, renderToast, directionsResponse }) {
  const [activeStop, setActiveStop] = useState({ stop: 'a place' });
  const [showCat, setShowCat] = useState(false);

  const handleStopChoice = (stop) => {
    setActiveStop(stop);
  };

  const showCategories = () => {
    if (activeStop.stop === 'a place') {
      renderToast('Error', 'error', 'Choose a place to explore');
    } else {
      console.log(activeStop);
      setShowCat(true);
    }
  };
  return (
    <div id="suggestions">
      <div className="heading">
        <h1>Explore:</h1>
        <Menu className="menu">
          <MenuButton as={Button} rightIcon={<AiFillCaretDown />}>
            {activeStop.stop}
          </MenuButton>
          <MenuList>
            {stops.map((stop) => (
              <MenuItem key={stop.id} onClick={() => handleStopChoice(stop)}>
                {stop.stop}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <button className="go-btn" onClick={showCategories}>
          GO
        </button>
      </div>
      {showCat && (
        <SuggestionCategories
          place={activeStop}
          directionsResponse={directionsResponse}
        />
      )}
    </div>
  );
}

export default TripSuggestions;
