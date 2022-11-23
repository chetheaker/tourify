import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TripPreview from '../TripPreview';
import mocks from './mocks';
import { formatDate } from '../../../Utils/date';

describe('TripPreview', () => {
  it ('Should render correctly', () => {
    render(
      <BrowserRouter>
        <TripPreview trip={mocks.trip} />
      </BrowserRouter>
    );
  });

  it ('Should render the preview image', async () => {
    render(
      <BrowserRouter>
        <TripPreview trip={mocks.trip} />
      </BrowserRouter>
    );

    const image = await screen.findByAltText(new RegExp(mocks.image.alt, 'i'));
    expect(image.className).toMatch(mocks.image.className);
  });

  it ('Should render the headings with the values of the trip attributes', async () => {
    render(
      <BrowserRouter>
        <TripPreview trip={mocks.trip} />
      </BrowserRouter>
    );

    const h1 = await screen.findByText(new RegExp(`^${mocks.trip.trip_name}$`, 'i'));
    expect(h1.localName).toMatch('h1');

    const firstStop = mocks.trip.stops[0].stop;
    const lastStop = mocks.trip.stops[mocks.trip.stops.length - 1].stop;

    const h2 = await screen.findByText(new RegExp(`^📍 ${firstStop} - ${lastStop}$`, 'i'));
    expect(h2.localName).toMatch('h2');
  });

  it ('Should show the formatted dates', async () => {
    render(
      <BrowserRouter>
        <TripPreview trip={mocks.trip} />
      </BrowserRouter>
    );

    const dates = await screen.findByText(new RegExp(`${formatDate(mocks.trip.start_date)} - ${formatDate(mocks.trip.end_date)}`));
    expect(dates.localName).toMatch('h2');
  });
});