describe('Mock API Responses', () => {
    it('should display mocked wallet balance', () => {
      cy.intercept('GET', '/api/wallets', { fixture: 'wallets.json' }).as('getWallets');
      cy.visit('/wallets');
      cy.wait('@getWallets');
      cy.contains('BTC').should('be.visible');
      cy.contains('ETH').should('be.visible');
    });
  });
  