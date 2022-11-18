import NavBar from '../../Components/NavBar/NavBar';
import { DateRangePicker } from '@mantine/dates';
import { AiOutlineCalendar } from 'react-icons/ai';
import { Autocomplete } from '@react-google-maps/api';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import './PlanTrip.css';
import { FormEvent, MutableRefObject, useRef } from 'react';
import { createNewTrip } from '../../Utils/TripService';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

function PlanTrip() {
  const dateRef = useRef() as MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();
  const toast = useToast();

  const formatDates = () => {
    if (!dateRef.current.value) {
      toast({
        position: 'top',
        title: 'Error',
        description: 'Dates cannot be empty',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
      return;
    }

    const dates = dateRef.current.value
      .split(' – ')
      .map((date) => date.replace(',', '').split(' '));

    let start =
      dates[0][2] + '/' + monthFormat(dates[0][0]) + '/' + dates[0][1];
    let end = dates[1][2] + '/' + monthFormat(dates[0][0]) + '/' + dates[1][1];

    return [new Date(start), new Date(end)];
  };

  const monthFormat = (month: string) => {
    switch (month) {
      case 'January':
        return '1';
      case 'February':
        return '2';
      case 'March':
        return '3';
      case 'April':
        return '4';
      case 'May':
        return '5';
      case 'June':
        return '6';
      case 'July':
        return '7';
      case 'August':
        return '8';
      case 'September':
        return '9';
      case 'October':
        return '10';
      case 'November':
        return '11';
      default:
        return '12';
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    type TargetType = EventTarget & {
      start: {
        value: string
      },
      end: {
        value: string
      },
      tripName: {
        value: string
      }
    }
    e.preventDefault();
    const target = e.target as TargetType;

    const start = target.start.value;
    const end = target.end.value;

    if (!start || !end) {
      toast({
        position: 'top',
        title: 'Error',
        description: 'Must have a start location and end destination',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
      return;
    }
    const dates = formatDates();
    const name = target.tripName.value || 'My Amazing Road Trip';

    if (dates) {
      const startLocation = {
        stop: start,
        id: uuidv4(),
        depature: dates[0],
        arrival: false
      };
  
      const endLocation = {
        stop: end,
        id: uuidv4(),
        depature: false,
        arrival: dates[1]
      };
  
      const itinerary = getItineraryDates(dates[0].toISOString(), dates[1].toISOString());
  
      const trip = {
        trip_name: name,
        start_date: dates[0],
        end_date: dates[1],
        stops: [startLocation, endLocation],
        itinerary: itinerary
      };

      const res = await createNewTrip(trip);
      const tripId = res.insertedId;
      navigate('/trips/' + tripId);

    }
  };

  const getItineraryDates = (start: string, end: string) => {
    let date1 = Date.parse(start);
    const date2 = Date.parse(end);

    const itinerary = [];
    while (date1 <= date2) {
      itinerary.push({
        date: new Date(date1),
        checklists: [],
        notes: [],
        places: []
      });
      date1 += 1000 * 60 * 60 * 24;
    }

    return itinerary;
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="plan-trip-container">
          <div className="heading-plan">
            <h1>
              Plan your next <span>road trip</span>
            </h1>
            <div className="overlay"></div>
          </div>
          <form className="trip-form" onSubmit={handleSubmit}>
            <input
              name="tripName"
              placeholder="Name your adventure"
              className="trip-name"
            />
            <div className="directions">
              <Autocomplete className="auto auto-start">
                <input
                  name="start"
                  placeholder="Starting from"
                  className="start"
                />
              </Autocomplete>
              <Autocomplete className="auto auto-end">
                <input name="end" placeholder="Going to" className="end" />
              </Autocomplete>
            </div>
            <div className="date-picker">
              <DateRangePicker
                ref={dateRef}
                placeholder="Pick your trip dates (you can change these later)"
                icon={<AiOutlineCalendar color="#1FC28B" />}
                minDate={dayjs(new Date()).toDate()}
              />
            </div>
            <button type="submit" className="plan-btn">
              Plan Trip
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PlanTrip;
