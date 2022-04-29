import {aliasMutation} from '../utils/graphql-test-utils';

describe('Logs in to second test account', () => {
  Cypress.Cookies.defaults({
    preserve: 'id',
  });

  it('Logs in to second test account', () => {
    cy.visit('/');

    cy.get('[data-cy=input_login_email').type('second_test@account.test.com');
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
});
