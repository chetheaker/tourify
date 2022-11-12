import './ItineraryDay.css';
import { formatDate } from '../../../../Utils/date';
import { GrLocation } from 'react-icons/gr';
import { BiNote } from 'react-icons/bi';
import { MdOutlineChecklistRtl } from 'react-icons/md';
import { useEffect, useState } from 'react';
import Places from './Places/Places';
import Notes from './Notes/Notes';
import Checklists from './Checklists/Checklists';

function ItineraryDay({ day, index, itinerary, setItinerary, renderToast }) {
  const [places, setPlaces] = useState([]);
  const [notes, setNotes] = useState([]);
  const [checklists, setChecklists] = useState([]);
  const [placesInputActive, setPlacesInputActive] = useState(false);
  const [notesInputActive, setNotesInputActive] = useState(false);
  const [checklistsInputActive, setChecklistsInputActive] = useState(false);

  useEffect(() => {
    setPlaces(day.places);
    setNotes(day.notes);
    setChecklists(day.checklists);
  }, [day.checklists, day.notes, day.places, itinerary]);

  const togglePlacesInput = () => {
    setPlacesInputActive(!placesInputActive);
    setNotesInputActive(false);
    setChecklistsInputActive(false);
  };

  const toggleNotesInput = () => {
    setNotesInputActive(!notesInputActive);
    setPlacesInputActive(false);
    setChecklistsInputActive(false);
  };

  const toggleChecklistsInput = () => {
    setChecklistsInputActive(!checklistsInputActive);
    setNotesInputActive(false);
    setPlacesInputActive(false);
  };

  return (
    <div className="itinerary-day">
      <div className="header">
        <div className="left">
          Day {index + 1}: {formatDate(day.date)}
        </div>
        <div className="right">
          <GrLocation size="1.3em" onClick={togglePlacesInput} />
          <BiNote size="1.3em" onClick={toggleNotesInput} />
          <MdOutlineChecklistRtl size="1.3em" onClick={toggleChecklistsInput} />
        </div>
      </div>
      {places.length ||
      notes.length ||
      checklists.length ||
      placesInputActive ||
      checklistsInputActive ||
      notesInputActive ? (
        <div className="itinerary-content">
          <Places
            places={places}
            setPlaces={setPlaces}
            placesInputActive={placesInputActive}
            setItinerary={setItinerary}
            dayIndex={index}
            renderToast={renderToast}
          />
          <Notes
            notes={notes}
            notesInputActive={notesInputActive}
            setNotes={setNotes}
            setItinerary={setItinerary}
            dayIndex={index}
            renderToast={renderToast}
          />
          <Checklists
            checklists={checklists}
            checklistsInputActive={checklistsInputActive}
          />
        </div>
      ) : (
        <div className="no-itinerary">
          <h1>You have no plans yet</h1>
        </div>
      )}
    </div>
  );
}

export default ItineraryDay;
