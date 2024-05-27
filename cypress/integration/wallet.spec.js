describe('Wallet API Tests', () => {
    const apiUrl = 'http://localhost:3000/api/wallet'; // Adjust the URL as needed
  
    before(() => {
      // Optional: Add setup code here, such as creating test data
      cy.request('POST', 'http://localhost:3000/api/auth/login', {
        username: 'testuser',
        password: 'testpassword',
      }).then((response) => {
        cy.wrap(response.body.token).as('token');
      });
    });
  
    it('should create a wallet', function() {
      cy.get('@token').then((token) => {
        cy.request({
          method: 'POST',
          url: apiUrl,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            currency: 'BTC',
            address: '1A1zP1...',
            network: 'bitcoin',
          },
        }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.have.property('id');
          cy.wrap(response.body.id).as('walletId'); // Save wallet ID for later tests
        });
      });
    });
  
    it('should get wallets', function() {
      cy.get('@token').then((token) => {
        cy.request({
          method: 'GET',
          url: apiUrl,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an('array');
        });
      });
    });
  
    it('should update a wallet', function() {
      cy.get('@walletId').then((walletId) => {
        cy.get('@token').then((token) => {
          cy.request({
            method: 'PUT',
            url: `${apiUrl}?id=${walletId}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: {
              currency: 'ETH',
              address: 'newAddress',
              network: 'ethereum',
            },
          }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('currency', 'ETH');
          });
        });
      });
    });
  
    it('should delete a wallet', function() {
      cy.get('@walletId').then((walletId) => {
        cy.get('@token').then((token) => {
          cy.request({
            method: 'DELETE',
            url: `${apiUrl}?id=${walletId}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', 'Wallet deleted successfully');
          });
        });
      });
    });
  });
  