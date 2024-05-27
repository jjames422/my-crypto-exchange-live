describe('Mock API Responses', () => {
  beforeEach(() => {
    cy.setCookie('next-auth.session-token', 'mock-session-token');
    cy.intercept('GET', '/api/wallets', { fixture: 'wallets.json' }).as('getWallets');
    cy.visit('/');
  });

  it('should display mocked wallet balance', () => {
    cy.wait('@getWallets');
    cy.get('#wallet-balance').should('contain', '1.5 BTC');
  });
});
