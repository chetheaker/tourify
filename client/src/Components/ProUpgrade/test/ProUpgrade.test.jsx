import { BrowserRouter } from "react-router-dom"
import ProUpgrade from "../ProUpgrade"
import { render, screen } from '@testing-library/react';
import mocks from "./mocks";

describe('ProUpgrade', () => {
  it('Should render correctly', () => {
    render(
      <BrowserRouter>
        <ProUpgrade />
      </BrowserRouter>
    );
  });

  it ('Should render the heading correctly', async () => {
    render(
      <BrowserRouter>
        <ProUpgrade />
      </BrowserRouter>
    );

    const heading = await screen.findByText(new RegExp(mocks.headingText, 'i'));
    expect(heading.localName).toMatch('h1');
  });

  it ('Should show the "upgrade" button', async () => {
    render(
      <BrowserRouter>
        <ProUpgrade />
      </BrowserRouter>
    );

    const button = await screen.findByRole('button');
    expect(button.localName).toMatch('button');
    expect(button.textContent).toMatch(new RegExp(mocks.buttonText, 'i'));
  });

  it ('Should render the features heading', async () => {
    render(
      <BrowserRouter>
        <ProUpgrade />
      </BrowserRouter>
    );

    const featuresHeadingPrice = await screen.findByText(mocks.body.heading.price);
    const featuresHeadingSubtitle = await screen.findByText(new RegExp(mocks.body.heading.month, 'i'));

    expect(featuresHeadingPrice.localName).toMatch('h1');
    expect(featuresHeadingPrice.className).toMatch('price');

    expect(featuresHeadingSubtitle.localName).toMatch('h1');
    expect(featuresHeadingSubtitle.className).toMatch('month');
  });

  it ('Should render the pro features list', async () => {
    render(
      <BrowserRouter>
        <ProUpgrade />
      </BrowserRouter>
    );

    for (const feature of mocks.body.features) {
      const element = await screen.findByText(new RegExp(feature, 'i'));
      expect(element.localName).toMatch('h1');
      // eslint-disable-next-line testing-library/no-node-access
      expect(element.parentElement.className).toMatch('feature');
    }
  });
})