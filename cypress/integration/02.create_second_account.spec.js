describe('02 Creates the second account', () => {
  it('Creates the second account', () => {
    cy.visit('/');
    cy.get('[data-cy=btn_sign_up').click();

    cy.get('[data-cy=input_sign_up_email').type('second_test@account.test.com');
    cy.get('[data-cy=input_sign_up_user_name').type('second_test');
    cy.get('[data-cy=input_sign_up_password').type('password');
    cy.get('[data-cy=input_sign_up_confirm_password').type('password');
    cy.get('[data-cy=btn_sign_up_submit').click();
  });

  it('Users logs out', () => {
    cy.get('[data-cy=btn_logout]').click();
  });
});
