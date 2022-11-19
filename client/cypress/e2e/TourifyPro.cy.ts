import '@testing-library/cypress/add-commands';

describe('Tourify Pro', () => {
  afterEach(() => {
    let str: string[] = [];
    try {
      cy.getCookies().then((cook) => {
        for (let l = 0; l < cook.length; l++) {
          if (cook.length > 0 && l === 0) {
            str[l] = cook[l].name;
            Cypress.Cookies.preserveOnce(str[l]);
          } else if (cook.length > 1 && l > 1) {
            str[l] = cook[l].name;
            Cypress.Cookies.preserveOnce(str[l]);
          }
        }
      })

    } catch (err) {

    }
  });

  it('should load the login page', () => {
    cy.visit('http://localhost:3001/');
  });

  it('should be redirected successfully from login', () => {
    cy.contains('Sign in').click();
    cy.get('.login-form > input[placeholder="Email"]').type('cypress@test.com');
    cy.get('.login-form > input[placeholder="Password"]').type('cypress').blur();
    cy.get('.login-form button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('should redirect to stripe when clicked the "stripe" button', () => {
    cy.findByRole('button', { name: /upgrade/i }).click();
  })
});