import { CalendarEvent } from "../../types/models";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const addToCalendar = async (events : CalendarEvent[], access_token: string) => {
  const res = await fetch(baseUrl + '/trips/export', {
    body: JSON.stringify({
      events,
      access_token,
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    credentials: 'include'
  });

  const json = await res.json();

  return json;
}