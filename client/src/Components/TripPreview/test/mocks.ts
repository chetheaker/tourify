const mocks = {
  trip: {
    _id: 'foo',
    trip_name: 'bar',
    start_date: new Date().toISOString(),
    end_date: new Date().toISOString(),
    stops: [
      {
      id: 'foostop',
      stop: 'foostop',
      departure: new Date().toISOString(),
      arrival: new Date().toISOString(),
      },
      {
        id: 'barstop',
        stop: 'barstop',
        departure: new Date().toISOString(),
        arrival: new Date().toISOString(),
      },
    ],
    itinerary: [],
    attendees: []
  },

  image: {
    className: 'preview-img',
    alt: 'trip preview'
  }
};

export default mocks;