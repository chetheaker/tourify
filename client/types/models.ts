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
  departure: string,
  arrival: boolean
}

type Itinerary = {
  date: string,
  notes: Note[],
  places: Place[]
}

type Note = {
  note: string,
  id: string
}

type Place = {
  place: string,
  id: string
}

type User = {
  _id: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  notifications: Notification[],
  account_type: string
}

type Notification = {
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