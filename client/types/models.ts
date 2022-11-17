export type Trip = {
  _id: string
  trip_name: string,
  start_date: string,
  end_date: string,
  stops: Stop[],
  itinerary: Itinerary[],
  attendees: string[]
};

export type Stop = {
  id: string,
  stop: string,
  departure: boolean,
  arrival: boolean,
}

export type Itinerary = {
  date: string,
  notes: Note[],
  places: Place[]
}

export type Note = {
  note: string,
  id: string
}

export type Place = {
  place: string,
  id: string
}

export type User = {
  _id: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  notifications: Notification[],
  account_type: string
}

export type Notification = {
  trip: NotificationTrip,
  inviter: NotificationInviter
}

type NotificationTrip = {
  id: string,
  name: string,
  start: string,
  end: string
}

type NotificationInviter = {
  firstName: string,
  lastName: string
}