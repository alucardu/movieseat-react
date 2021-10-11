import {aliasMutation} from '../utils/graphql-test-utils';

describe('Removes the first account', () => {
  it('Log in first user', () => {
    cy.visit('/');
    cy.get('[data-cy=btn_login').click();

    cy.get('[data-cy=input_login_email').type('first_test@account.test.com');
    cy.get('[data-cy=input_login_password').type('password');

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

  it('Remove account', () => {
    cy.get('[data-cy=btn_remove_account]').click();
    cy.get('[data-cy=btn_confirm_remove_account]').click();
  });
});
