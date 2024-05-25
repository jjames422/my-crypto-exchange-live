Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: '/api/auth/callback/credentials',
    body: {
      username: 'testuser',
      password: 'password'
    }
  }).then((res) => {
    cy.setCookie('next-auth.session-token', res.body.token);
  });
});
