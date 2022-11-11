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
