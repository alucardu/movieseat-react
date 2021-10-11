// import {aliasMutation} from '../utils/graphql-test-utils';

describe('13 User cannot add duplicate movie', () => {
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

  it('Validate duplicate movie cannot be added', () => {
    cy.get('div:contains(Kill Bill: Vol. 2 is already added to your watchlist.)');
  });

  it('Users logs out', () => {
    cy.get('[data-cy=btn_logout]').click({force: true});
  });
});
