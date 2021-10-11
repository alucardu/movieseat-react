describe('Removes the second account', () => {
  it('Navigate to profile page', () => {
    cy.get('[data-cy=btn_account]').within(() => {
      cy.get('a').click({force: true});
    });
  });

  it('Remove account', () => {
    cy.get('[data-cy=btn_remove_account]').click();
    cy.get('[data-cy=btn_confirm_remove_account]').click();
  });
});
