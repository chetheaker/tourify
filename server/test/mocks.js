mocks = {
  user: {
    email: 'test@gmail.com',
    first_name: 'John',
    last_name: 'Doe',
    password: 'password'
  },
  friend: {
    email: 'test2@gmail.com',
    first_name: 'Mary',
    last_name: 'Jane',
    password: 'password'
  },
  trip: {
    trip_name: 'lol',
    start_date: '2022-11-20T23:00:00.000Z',
    end_date: '2022-11-23T23:00:00.000Z',
    stops: [
      {
        stop: 'Barcelona, España',
        id: '5842b114-86fe-4232-9d2f-8f9988d7ad91',
        depature: '2022-11-20T23:00:00.000Z',
        arrival: false
      },
      {
        stop: 'Madrid, España',
        id: 'afcd3526-3a03-48cc-aa30-8293ae868916',
        depature: false,
        arrival: '2022-11-23T23:00:00.000Z'
      }
    ],
    itinerary: []
  },
  newRoute: [
    {
      stop: 'Barcelona, España',
      id: '5842b114-86fe-4232-9d2f-8f9988d7ad91',
      depature: '2022-11-20T23:00:00.000Z',
      arrival: false
    },
    {
      stop: 'San Sebastian, España',
      id: 'afcd3526-3a03-48cc-aa30-8293ae868916',
      depature: false,
      arrival: '2022-11-23T23:00:00.000Z'
    }
  ],
  newItinerary: [
    {
      date: '2022-11-20T23:00:00.000Z',
      checklists: [],
      notes: [
        { note: 'this worked', id: 'd78fa255-fc5d-4ed1-ba46-0a4d79dead31' }
      ],
      places: [
        {
          place: 'Caracas, Venezuela',
          id: 'bf7afc5b-ab3a-477f-8ba9-55a7d9b46461'
        }
      ]
    },
    {
      date: '2022-11-21T23:00:00.000Z',
      checklists: [],
      notes: [],
      places: []
    },
    {
      date: '2022-11-22T23:00:00.000Z',
      checklists: [],
      notes: [],
      places: []
    },
    {
      date: '2022-11-23T23:00:00.000Z',
      checklists: [],
      notes: [],
      places: []
    }
  ],
  items: [{ id: 'price_1M4MZeGsIQQOt2gpVjyaZI0N', quantity: 1 }]
};
module.exports = mocks;
