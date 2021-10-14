// import {aliasMutation} from '../utils/graphql-test-utils';

describe('12 add remove from suggestions', () => {
  it('Remove movie from dashboard', () => {
    cy.get('[data-cy=btn_watchlist]').click();
    cy.get('[data-cy=list_movie_overview_dashboard] li').eq(1).click();
    cy.get('[data-cy=btn_remove_movie_from_dashboard]').click();
  });

  it('Validate movie has been removed', () => {
    cy.get('[data-cy=list_movie_overview_dashboard] li').eq(1).children().should('not.exist');
  });
});
