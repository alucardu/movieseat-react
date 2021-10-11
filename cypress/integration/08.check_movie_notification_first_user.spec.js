import {aliasMutation} from '../utils/graphql-test-utils';

describe('08 Check movie notification from second user', () => {
  Cypress.Cookies.defaults({
    preserve: 'id',
  });

  it('Logs in to first test account', () => {
    cy.visit('/');
    cy.get('[data-cy=btn_login').click();

    cy.get('[data-cy=input_login_email').type('first_test@account.test.com');
    cy.get('[data-cy=input_login_password').type('password');
  });

  it('Validates user logged in', () => {
    cy.intercept('POST', 'http://localhost:9090/graphql', (req) => {
      aliasMutation(req, 'loginUser');
    });

    cy.get('[data-cy=btn_login_submit').click();

    cy.wait('@gqlloginUserMutation')
        .its('response')
        .should((response) => expect(response.statusCode).to.eq(200))
        .should((response) => expect(response.body.data.loginUser).to.have.property('id'))
        .should((response) => expect(response.body.data.loginUser).to.have.property('email'))
        .should((response) => expect(response.body.data.loginUser).to.have.property('user_name'));
  });

  it('User should have a new (movie) notification', () => {
    cy.get('[data-cy=notification_count]').contains('1');
  });

  it('Checks notifications menu', () => {
    cy.get('[data-cy=btn_open_notifications]').click();
    cy.get('[data-cy=list_notifications]').first().contains('second_test has added Kill Bill: Vol. 2 to their watchlist.');
  });

  it('Closes notifications popover', () => {
    cy.get('body').click();
    cy.get('[data-cy=btn_open_notifications]').should('not.be.visible');
  });
});
