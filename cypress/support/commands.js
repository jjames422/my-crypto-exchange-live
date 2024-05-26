Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', '/api/auth/callback/credentials', { username, password })
    .its('body')
    .then((body) => {
      cy.setCookie('next-auth.session-token', body.sessionToken);
      cy.visit('/');
    });
});
