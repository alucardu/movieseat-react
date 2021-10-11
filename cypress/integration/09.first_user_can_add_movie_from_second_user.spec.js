import {aliasMutation} from '../utils/graphql-test-utils';

describe('09 First user can add movie from second user profile', () => {
  it('Navigate to own profile page', () => {
    cy.get('[data-cy=btn_account]').within(() => {
      cy.get('a').click({force: true});
    });
  });

  it('First user can navigate to profile second user', () => {
    cy.get('[data-cy=list_followed_users]').within(() => {
      cy.contains('second_test').click();
    });
  });

  it('Can add movie from profile page', () => {
    cy.get('[data-cy=list_profile_movies]').first().within(() => {
      cy.get('li').invoke('attr', 'title').should('eq', 'Kill Bill: Vol. 2');
      cy.get('li').click();
      cy.get('[data-cy=btn_add_movie]').click();
    });
  });

  it('Validate movie was added', () => {
    cy.get('[data-cy=btn_watchlist]').click();
    cy.get('[data-cy=list_movie_overview_dashboard]').first().within(() => {
      cy.get('li').invoke('attr', 'title').should('eq', 'Kill Bill: Vol. 2');
      cy.get('li').click();
    });
  });

  it('Users logs out', () => {
    cy.intercept('POST', 'http://localhost:9090/graphql', (req) => {
      aliasMutation(req, 'logoutUser');
    });

    cy.get('[data-cy=btn_logout').click();

    cy.wait('@gqllogoutUserMutation')
        .its('response')
        .should((response) => expect(response.statusCode).to.eq(200))
        .should((response) => expect(response.body.data).to.have.property('logoutUser'))
        .should((response) => expect(response.body.data.logoutUser).to.eq(true));
  });
});
