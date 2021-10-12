// import {aliasMutation} from '../utils/graphql-test-utils';

describe('11 Can add movie from suggestions', () => {
  it('Navigate to suggestions', () => {
    cy.get('[data-cy=btn_suggestions]').click();
  });

  it('Add movie from suggestions', () => {
    cy.get('[data-cy=list_movie_overview_dashboard]').first().within(() => {
      cy.get('li').first().click();
      cy.get('[data-cy=btn_add_movie]').click();
    });
  });

  it('Check if movie has been added to dashboard', () => {
    cy.get('[data-cy=btn_watchlist]').click();
    cy.get('[data-cy=list_movie_overview_dashboard]').within(() => {
      cy.get('[title="Black Water: Abyss"]');
    });
  });
});
