Cypress.Commands.add('login', (username, password) => {
    cy.request('POST', '/api/auth/login', { username, password })
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });
  