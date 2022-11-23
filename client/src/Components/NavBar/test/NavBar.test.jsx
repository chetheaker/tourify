import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../NavBar';
import mocks from './mocks';

describe('NavBar', () => {
  it('Should render correctly', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
  });

  it('Should have all the navbar links', async () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    for (const link of mocks.links) {
      const element = (await screen.findAllByText(new RegExp(link, 'i')))[0];
      const text = element.textContent;
      expect(text).toMatch(link);
    }
  });
})