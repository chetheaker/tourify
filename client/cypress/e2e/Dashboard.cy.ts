describe('Dashboard page', () => {
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

  it('should redirect to the create trip from the create trip link', () => {
    cy.get('.my-trips > .header > .right > button').click();
    cy.url().should('include', '/plan');
    cy.get('.dashboard-link').click();
    cy.url().should('include', '/dashboard')
  });
})