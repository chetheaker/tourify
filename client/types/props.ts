import React from "react";
import { Trip, Stop, Note, Itinerary, Place } from "./models"

export type ExploreTripPreviewProps = {
  stopScroll?: () => void,
  startScroll?: () => void,
  trip: Trip,
};

export type MapProps = {
  directionsResponse: google.maps.DirectionsResult | null
};

export type SignInProps = {
  rightActive: boolean,
  setRightActive: React.Dispatch<React.SetStateAction<boolean>>
};

export type SignUpProps = SignInProps;


export type StopsListProps = {
  stops: Stop[],
  isEdit: boolean,
  setStops: React.Dispatch<React.SetStateAction<Stop[]>>,
  renderToast: (title: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined, message: string) => void
};

export type StopProps = StopsListProps &
{
  stop: Stop,
  index: number,
};

export type StopInputProps = {
  isEdit: boolean,
  setStops: React.Dispatch<React.SetStateAction<Stop[]>>,
}

export type TripPreviewProps = {
  trip: Trip
};

export type TripsContainerProps = {
  planTrip: () => void
};

export type DeleteProfileProps = {
  handleLogOut: () => Promise<void>,
};

export type AttendeesProps = {
  attendees: string[],
  adminUser: string
};

export type DeleteTripProps = {
  tripId: string,
  renderToast: (title: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined, message: string) => void
};

export type InviteFriendsProps = DeleteTripProps;

export type RouteDetailsProps = MapProps;

export type RouteDetailProps = {
  index: number,
  leg: google.maps.DirectionsLeg
};

export type NoteProps = {
  note: Note,
  deleteNote: (note: Note) => void,
  setItinerary: React.Dispatch<React.SetStateAction<Itinerary[]>>,
  dayIndex: number,
  renderToast: (title: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined, message: string) => void,
  isAuth: boolean,
};

export type NotesProps = {
  notesInputActive: boolean,
  notes: Note[],
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
  setItinerary: React.Dispatch<React.SetStateAction<Itinerary[]>>,
  dayIndex: number,
  renderToast: (title: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined, message: string) => void,
  isAuth: boolean,
};

export type PlacesProps = {
  placesInputActive: boolean,
  places: Place[],
  setPlaces: React.Dispatch<React.SetStateAction<Place[]>>,
  setItinerary: React.Dispatch<React.SetStateAction<Itinerary[]>>,
  dayIndex: number,
  renderToast: (title: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined, message: string) => void,
  isAuth: boolean,
};

export type ItineraryDayProps = {
  day: Itinerary,
  index: number,
  itinerary: Itinerary[],
  setItinerary: React.Dispatch<React.SetStateAction<Itinerary[]>>,
  renderToast: (title: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined, message: string) => void,
  isAuth: boolean,
};

export type ItineraryListProps = {
  itinerary: Itinerary[],
  setItinerary: React.Dispatch<React.SetStateAction<Itinerary[]>>,
  renderToast: (title: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined, message: string) => void,
  isAuth: boolean,
};

export type TripItineraryProps = {
  itinerary: Itinerary[],
  setItinerary: React.Dispatch<React.SetStateAction<Itinerary[]>>,
  tripId: string,
  renderToast: (title: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined, message: string) => void,
  isAuth: boolean,
};

export type TripOverviewProps = {
  trip: Trip,
  directionsResponse: google.maps.DirectionsResult | null
};

export type TripRouteProps = {
  stops: Stop[],
  setStops: React.Dispatch<React.SetStateAction<Stop[]>>,
  tripStops: Stop[],
  id: string,
  renderToast: (title: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined, message: string) => void,
  isAuth: boolean,
  setTrip: React.Dispatch<React.SetStateAction<Trip & { user: string; }>>,
};

export type SuggestedResultProps = {
  place: google.maps.places.PlaceResult,
  itinerary: Itinerary[],
  setItinerary: React.Dispatch<React.SetStateAction<Itinerary[]>>,
  isAuth: boolean
};

export type SuggestedResultsProps = {
  place: Place & {stop: string},
  category: string,
  directionsResponse: google.maps.DirectionsResult | null,
  itinerary: Itinerary[],
  setItinerary: React.Dispatch<React.SetStateAction<Itinerary[]>>,
  isAuth: boolean
};

export type SuggestionCategoriesProps = {
  place: Place & {
    stop: string;
},
  directionsResponse: google.maps.DirectionsResult | null,
  itinerary: Itinerary[],
  setItinerary: React.Dispatch<React.SetStateAction<Itinerary[]>>,
  isAuth: boolean
};

export type TripSuggestionsProps = {
  stops: Stop[],
  renderToast: (title: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined, message: string) => void,
  directionsResponse: google.maps.DirectionsResult | null,
  itinerary: Itinerary[],
  setItinerary: React.Dispatch<React.SetStateAction<Itinerary[]>>,
  isAuth: boolean
};