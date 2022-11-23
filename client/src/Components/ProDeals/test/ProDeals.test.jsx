import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProDeals from '../ProDeals';
import mocks from './mocks';

describe('ProDeals', () => {
  it('Should render correctly', () => {
    render(
      <BrowserRouter>
        <ProDeals />
      </BrowserRouter>
    );
  });

  it('Should render the headings correctly', async () => {
    render(
      <BrowserRouter>
        <ProDeals />
      </BrowserRouter>
    );

    const h1 = await screen.findByText(new RegExp(mocks.headingTexts.h1, 'i'));
    expect(h1.localName).toMatch('h1');

    const h2 = await screen.findByText(new RegExp(mocks.headingTexts.h2, 'i'));
    expect(h2.localName).toMatch('h2');
  });

  it('Should render the button correctly', async () => {
    render(
      <BrowserRouter>
        <ProDeals />
      </BrowserRouter>
    );

    const button = await screen.findByRole('button');
    expect(button.textContent).toMatch(new RegExp(mocks.buttonText, 'i'));
  });
})