describe('05 Users can follow each other', () => {
  it('Navigate to profile page', () => {
    cy.get('[data-cy=btn_account]').within(() => {
      cy.get('a').click({force: true});
    });
  });

  it('User can search for other users', () => {
    cy.get('[data-cy=input_search_user]').type('second_test');
  });

  it('User can navigate to other user profile', () => {
    cy.get('[data-cy=list_returned_users]').within(() => {
      cy.contains('second_test').click();
    });
  });

  it('First test can follow second test', () => {
    cy.get('[data-cy=btn_follow_user]').click();
  });

  it('Validate that first user is following second user', () => {
    cy.get('[data-cy=btn_account]').within(() => {
      cy.get('a').click({force: true});
    });

    cy.get('[data-cy=list_followed_users]').within(() => {
      cy.contains('second_test');
    });
  });

  it('Users logs out', () => {
    cy.get('[data-cy=btn_logout]').click();
  });
});
