import {aliasMutation} from '../utils/graphql-test-utils';

describe('02 Creates the second account', () => {
  it('Creates the second account', () => {
    cy.intercept('POST', 'http://localhost:9090/graphql', (req) => {
      aliasMutation(req, 'signupUser');
    });

    cy.visit('/');
    // cy.get('[data-cy=btn_login]').click({force: true});
    cy.get('[data-cy=btn_sign_up]').click();

    cy.get('[data-cy=input_sign_up_email').type('second_test@account.test.com');
    cy.get('[data-cy=input_sign_up_user_name').type('second_test');
    cy.get('[data-cy=input_sign_up_password]').type('password');
    cy.get('[data-cy=input_sign_up_confirm_password]').type('password');
    cy.get('[data-cy=btn_sign_up_submit]').click();

    cy.wait('@gqlsignupUserMutation').its('request.body.variables').should('deep.equal', {
      email: 'second_test@account.test.com',
      password: 'password',
      user_name: 'second_test',
    });

    cy.wait(100);
  });


  it('Activate account', () => {
    cy.task('getLastEmail', 'second_test@account.test.com').then(cy.wrap).then((response) => {
      const regex = /"([^"]*)"/;
      const x = response.match(regex);
      cy.log(x[1]);
      cy.visit(x[1]);
      cy.get('[data-cy=btn_sign_up_submit]').click();
    });
  });

  it('Should have logged in', () => {
    cy.url().should('not.contain', 'activate-account');
  });


  it('Users logs out', () => {
    cy.get('[data-cy=btn_logout]').click();
  });
});
