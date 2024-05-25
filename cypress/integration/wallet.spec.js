describe('Wallet Management', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should allow user to create a new wallet', () => {
    cy.visit('/wallets');
    cy.contains('Create Wallet').click();
    cy.get('input[name="currency"]').type('BTC');
    cy.contains('Submit').click();
    cy.contains('Wallet created successfully').should('be.visible');
  });

  it('should display created wallets', () => {
    cy.visit('/wallets');
    cy.contains('BTC').should('be.visible');
  });
});
