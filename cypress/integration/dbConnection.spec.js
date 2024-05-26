describe('Database Connection', () => {
  it('should connect to the database and execute a query', () => {
    cy.exec('node ./dbtest.js').its('code').should('eq', 0);
  });
});
