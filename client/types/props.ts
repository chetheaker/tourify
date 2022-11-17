import React from "react";
import { Trip, Stop } from "./models"

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
  renderToast: (title: string, status: string, message: string) => void
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