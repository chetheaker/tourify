describe('Login page', () => {
  it('should load the page', () => {
    cy.visit('http://localhost:3001/');
  });
  describe('Register', () => {
    it ('should register a user through the sign up form', () => {
      cy.get('.signup-form > .names > input[placeholder="First name"]').type('Cypress');
      cy.get('.signup-form > .names > input[placeholder="Last name"]').type('User');
      cy.get('.signup-form > input[placeholder="Email"]').type('cypress@test.com');
      cy.get('.signup-form > input[placeholder="Password"]').type('cypress').blur();
      cy.get('.signup-form button[type="submit"]').click();
      cy.get('.profile-link').click();
      cy.get('.chakra-button.logout').click();
      cy.get('.chakra-button.css-18zw69y').click();
    });
  });

  describe('Login', () => {
    it ('should login an existing user', () => {
      cy.contains('Sign in').click();
      cy.get('.login-form > input[placeholder="Email"]').type('cypress@test.com');
      cy.get('.login-form > input[placeholder="Password"]').type('cypress').blur();
      cy.get('.login-form button[type="submit"]').click();
      cy.get('.profile-link').click();
      cy.get('.chakra-button.logout').click();
      cy.get('.chakra-button.css-18zw69y').click();
    });
  })
})