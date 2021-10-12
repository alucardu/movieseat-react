import {aliasMutation} from '../utils/graphql-test-utils';

describe('07 Second user can add movie from search', () => {
  it('User searches for movie', () => {
    cy.get('[data-cy=btn_home]').click();
    cy.get('[data-cy=input_movie_search]').type('Kill Bill: Vol .2');
  });

  it('Search query shows results', () => {
    cy.get('[data-cy=list_movie_search_results]').should('be.visible');
  });

  it('Can click on first search result', () => {
    cy.get('[data-cy=list_movie_search_results]').first().click();
  });

  it('Validate movie has been added to watchlist', () => {
    cy.get('[data-cy=list_movie_overview_dashboard]').first().within(() => {
      cy.get('[title="Kill Bill: Vol. 2"]').should('exist');
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
