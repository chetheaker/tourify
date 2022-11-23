import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../SignUp';
import mocks from './mocks';

describe('SignUp', () => {
  it ('Should render correctly', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  });

  it ('Should not display the form if the login form is active', () => {
    const { container } = render(
      <BrowserRouter>
        <SignUp rightActive={false}/>
      </BrowserRouter>
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveClass('hide');
  });

  it ('Should display the form if the login form is not active', () => {
    const { container } = render(
      <BrowserRouter>
        <SignUp rightActive={true}/>
      </BrowserRouter>
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveClass('show');
  });

  it ('Should render the form headings', async () => {
    render(
      <BrowserRouter>
        <SignUp rightActive={true}/>
      </BrowserRouter>
    );

    const h1 = await screen.findByText(new RegExp(mocks.headings.h1, 'i'));
    expect(h1.localName).toMatch('h1');
    
    const h2 = await screen.findByText(new RegExp(mocks.headings.h2, 'i'));
    expect(h2.localName).toMatch('h2');
  });

  it ('Should render the form inputs', async () => {
    render(
      <BrowserRouter>
        <SignUp rightActive={true}/>
      </BrowserRouter>
    );

    for (const placeholder of mocks.form.placeholders) await screen
      .findAllByPlaceholderText(new RegExp(placeholder, 'i'));
  });

  it ('Should render the form submit button', async () => {
    render(
      <BrowserRouter>
        <SignUp rightActive={true}/>
      </BrowserRouter>
    );

    const button = (await screen.findAllByRole('button'))[0];

    expect(button.textContent).toMatch(new RegExp(mocks.form.buttons.submit, 'i'));
  });

  it ('Should render the "sign in" button', async () => {
    render(
      <BrowserRouter>
        <SignUp rightActive={true}/>
      </BrowserRouter>
    );

    const button = (await screen.findAllByRole('button'))[1];
    expect(button.textContent).toMatch(new RegExp(mocks.form.buttons.switchForm, 'i'));
  });
});