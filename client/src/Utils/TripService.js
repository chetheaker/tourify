const baseUrl = process.env.REACT_APP_BASE_URL;

export const getUserTrips = async () => {
  const res = await fetch(baseUrl + '/trips/user', {
    method: 'GET',
    credentials: 'include'
  });

  const trips = await res.json();
  return trips;
};
