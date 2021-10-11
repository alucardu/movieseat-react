describe('00 Remove test accounts', () => {
  it('Removes first testing accounts', () => {
    const mutation = `
    mutation {
      removeUserAccount(email: "first_test@account.test.com")
    }`;

    cy.request({
      url: 'http://localhost:9090/graphql',
      method: 'POST',
      body: {query: mutation},
    });
  });

  it('Removes second testing accounts', () => {
    const mutation = `
    mutation {
      removeUserAccount(email: "second_test@account.test.com")
    }`;

    cy.request({
      url: 'http://localhost:9090/graphql',
      method: 'POST',
      body: {query: mutation},
    });
  });
});
