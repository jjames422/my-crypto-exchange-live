describe('Wallet Management', () => {
  beforeEach(() => {
    cy.request('POST', '/api/auth/callback/credentials', {
      username: 'testuser',
      password: 'password'
    }).then((response) => {
      const token = response.body.token;  // Ensure you extract the token correctly
      cy.setCookie('next-auth.session-token', token);
    });
  });

  it('should allow user to create a new wallet', () => {
    cy.visit('/wallets');
    cy.get('#new-wallet-button').click();
    cy.get('#wallet-currency').select('BTC');
    cy.get('#create-wallet-button').click();
    cy.get('.wallet-list').should('contain', 'BTC');
  });
});
