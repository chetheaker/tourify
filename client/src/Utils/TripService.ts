import { Itinerary, Stop } from "../../types/models";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getUserTrips = async () => {
  const res = await fetch(baseUrl + '/trips/user', {
    method: 'GET',
    credentials: 'include'
  });

  const trips = await res.json();
  return trips;
};

export const createNewTrip = async (trip: {
  trip_name: string,
  start_date: string,
  end_date: string,
  stops: Stop[],
  itinerary: Itinerary[]
}) => {
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

export const getUserTripById = async (id: string) => {
  const res = await fetch(baseUrl + '/trips/' + id, {
    method: 'GET',
    credentials: 'include'
  });
  const trip = await res.json();
  return trip;
};

export const updateTripName = async (id: string, newName: string) => {
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

export const updateTripRoute = async (id: string, newRoute: Stop[]) => {
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

export const updateTripItinerary = async (id: string, newItinerary: Itinerary[]) => {
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

export const deleteTrip = async (id: string) => {
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

export const getFriendTrips = async () => {
  const res = await fetch(baseUrl + '/trips/friends', {
    method: 'GET',
    credentials: 'include'
  });

  const json = res.json();
  return json;
};

export const inviteUser = async (id: string, email: string) => {
  const res = await fetch(baseUrl + '/trips/' + id + '/invite/' + email, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({})
  });

  const json = await res.json();
  return json;
};

export const acceptInvite = async (id: string) => {
  const res = await fetch(baseUrl + '/trips/' + id + '/accept', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({})
  });

  const json = await res.json();
  return json;
};

export const declineInvite = async (id: string) => {
  const res = await fetch(baseUrl + '/trips/' + id + '/decline', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({})
  });

  const json = await res.json();
  return json;
};
