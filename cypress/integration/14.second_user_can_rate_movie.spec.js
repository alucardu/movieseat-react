// import {aliasMutation} from '../utils/graphql-test-utils';

describe('14 User can rate a movie', () => {
  it('Open movie rating container', () => {
    cy.get('[data-cy=btn_watchlist]').click();
    cy.get('[data-cy=list_movie_overview_dashboard]').within(() => {
      cy.get('[title="Kill Bill: Vol. 2"]').click();
      cy.get('[data-cy=btn_navigate_to_movie]').click();
    });
  });

  it('Checks if rating container is open', () => {
    cy.get('[data-cy=container_rating_options]').should('exist');
  });

  it('Adds a rating of 3 to the movie', () => {
    cy.get('[data-cy=container_rating_options] button').eq(2).click();
  });

  it('Validate rating has been added', () => {
    cy.contains('Your rating has been added').should('exist');
  });

  it('Users logs out', () => {
    cy.get('[data-cy=btn_logout]').click({force: true});
  });
});

