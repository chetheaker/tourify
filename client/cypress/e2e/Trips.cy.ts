import '@testing-library/cypress/add-commands';

describe('Trips', () => {
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
  })

  it('should load the login page', () => {
    cy.visit('http://localhost:3001/');
  });

  it('should be redirected successfully from login and go to create trip', () => {
    cy.contains('Sign in').click();
    cy.get('.login-form > input[placeholder="Email"]').type('cypress@test.com');
    cy.get('.login-form > input[placeholder="Password"]').type('cypress').blur();
    cy.get('.login-form button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  describe('Create trip', () => {
    it('should be redirected to the create trip form if the Create Trip button is clicked', () => {
      cy.findByText(/Create trip/i).click();
      cy.url().should('include', '/plan');
    })

    it('should not create a trip if one is not filled', () => {
      cy.get('input[placeholder="Name your adventure"').type('Cypress adventure');
      cy.get('.trip-form button[type="submit"]').click();
      cy.url().should('include', '/plan');
      cy.get('input[placeholder="Starting from"').type('Barcelona, Spain');
      cy.get('.trip-form button[type="submit"]').click();
      cy.url().should('include', '/plan');
      cy.get('input[placeholder="Going to"').type('Madrid, Spain');
      cy.get('.trip-form button[type="submit"]').click();
      cy.url().should('include', '/plan');
    });
  
    it('should create a trip if everything is filled', () => {
      cy.get('input[placeholder="Pick your trip dates (you can change these later)"').click();
      cy.findByRole('button', {  name: /28/i}).click();
      cy.findByRole('button', {  name: /30/i}).click();
      cy.findByRole('button', {  name: /plan trip/i}).click();
      cy.url().should('include', '/trips');
    });
  });

  describe('Update trip', () => {
    it('should be able to edit the trip name', () => {
      cy.get('input[value="Cypress adventure"]').type(' edited!').blur();
      cy.get('input[value="Cypress adventure"]').should('have.value', 'Cypress adventure edited!');
    });
    describe('Places', () => {
      it('should be able to add a place to the trip', () => {
        cy.get('#itinerary > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > svg:nth-child(1)').click();
        cy.get('#itinerary > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > form > div > input').type('Girona, Spain');
        cy.findByRole('button', { name: /add place/i }).click();
        cy.get('#itinerary > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div > div').should('include.text', 'Girona, Spain');
      });
      it('should be able to delete a trip place', () => {
        cy.get('#itinerary > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div > div > svg').click();
      })
    });
    describe('Notes', () => {
      it('should be able to add a note to the trip', () => {
        cy.get('#itinerary > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > svg:nth-child(2)').click();
        cy.get('#itinerary > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > form > textarea')
          .scrollIntoView({easing: 'linear', duration: 500}).focus().type('Cypress notes');
        cy.get('#itinerary > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > form > button')
          .click();
        cy.get('#itinerary > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(1) > div').should('contain.text', 'Cypress notes');
      });

      it('should be able to edit a note in a trip', () => {
        cy.get('#itinerary > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2) > svg:nth-child(1)').click();
        cy.get('.note textarea').focus().type(' edited!');
        cy.get('#itinerary > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2) > svg:nth-child(1)').click();
        cy.get('#itinerary > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(1) > div').should('contain.text', 'Cypress notes edited!');
      });

      it('should be able to delete a note in a trip', () => {
        cy.get('#itinerary > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2) > svg:nth-child(2)').click();
      })
    });
    describe('Stops', () => {
      it('should be able to add a stop to the trip', () => {
        cy.get('#trip > div:nth-child(2) > div:nth-child(3) > button').click();
        cy.get('#route > form input').focus().type('Sevilla, Spain');
        cy.findByRole('button', { name: /add stop/i }).click();
        cy.findByRole('button', { name: /sevilla, spain/i }).should('have.text', 'Sevilla, Spain');
        cy.findByRole('button', { name: /save changes/i }).click();
      });
      it('should be able to remove a stop in the trip', () => {
        cy.get('#trip > div:nth-child(2) > div:nth-child(3) > button').click();
        cy.get('#route > div:nth-child(1) > div:nth-child(2) > svg').click();
        cy.findByRole('button', { name: /save changes/i }).click();
      });
    });
  });
  describe('Delete trip', () => {
    it('should be able to delete a trip', () => {
      cy.findByRole('button', { name: /delete trip/i }).click();
      cy.findByRole('button', { name: /delete/i }).click();
      cy.url().should('contain', '/dashboard');
    });
  })
})