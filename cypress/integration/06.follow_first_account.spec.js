import {aliasMutation} from '../utils/graphql-test-utils';

describe('06 Users can follow each other', () => {
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

  it('Navigate to profile page', () => {
    cy.get('[data-cy=btn_account]').within(() => {
      cy.get('a').click({force: true});
    });
  });

  it('User can search for other users', () => {
    cy.get('[data-cy=input_search_user]').type('first_test');
  });

  it('User can navigate to other user profile', () => {
    cy.get('[data-cy=list_returned_users]').within(() => {
      cy.contains('first_test').click();
    });
  });

  it('Second test can follow first test', () => {
    cy.get('[data-cy=btn_follow_user]').click();
  });

  it('Validate that second user is following first user', () => {
    cy.get('[data-cy=btn_account]').within(() => {
      cy.get('a').click({force: true});
    });

    cy.get('[data-cy=list_followed_users]').within(() => {
      cy.contains('first_test');
    });
  });
});
