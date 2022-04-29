describe('03 Logs in to first test account', () => {
  Cypress.Cookies.defaults({
    preserve: 'id',
  });

  it('Logs in to first test account', () => {
    cy.visit('/');

    cy.get('[data-cy=input_login_email]').type('first_test@account.test.com');
    cy.get('[data-cy=input_login_password]').type('password');
    cy.get('[data-cy=btn_login_submit]').click();
  });
});
