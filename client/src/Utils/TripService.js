const baseUrl = process.env.REACT_APP_BASE_URL;

export const getUserTrips = async () => {
  const res = await fetch(baseUrl + '/trips/user', {
    method: 'GET',
    credentials: 'include'
  });

  const trips = await res.json();
  return trips;
};

export const createNewTrip = async (trip) => {
  const res = await fetch(baseUrl + '/trips/create', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(trip)
  });

  const json = await res.json();
  return json;
};

export const getUserTripById = async (id) => {
  const res = await fetch(baseUrl + '/trips/' + id, {
    method: 'GET',
    credentials: 'include'
  });
  const trip = await res.json();
  return trip;
};

export const updateTripName = async (id, newName) => {
  const res = await fetch(baseUrl + '/trips/' + id + '/name', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ name: newName })
  });
  const json = await res.json();
  return json;
};

export const updateTripRoute = async (id, newRoute) => {
  const res = await fetch(baseUrl + '/trips/' + id + '/route', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ route: newRoute })
  });
  const json = await res.json();
  return json;
};

export const updateTripItinerary = async (id, newItinerary) => {
  const res = await fetch(baseUrl + '/trips/' + id + '/itinerary', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ itinerary: newItinerary })
  });

  const json = await res.json();
  return json;
};

export const deleteTrip = async (id) => {
  const res = await fetch(baseUrl + '/trips/' + id + '/delete', {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({})
  });
  const json = await res.json();
  return json;
};

export const getExploreTrips = async () => {
  const res = await fetch(baseUrl + '/trips/explore', {
    method: 'GET',
    credentials: 'include'
  });

  const json = await res.json();
  return json;
};
