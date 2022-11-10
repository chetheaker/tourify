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
  console.log(trip);
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
