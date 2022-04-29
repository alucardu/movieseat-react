import {aliasMutation} from '../utils/graphql-test-utils';

describe('04 Checks notifications', () => {
  it('User should have onboarding notification', () => {
    cy.get('[data-cy=notification_count]').contains('1');
  });

  it('Checks notifications menu', () => {
    cy.get('[data-cy=btn_open_notifications]').click({force: true});
    cy.get('[data-cy=list_notifications]').first().contains('Start following some users!');
  });

  it('Can watch a notification', () => {
    cy.intercept('POST', 'http://localhost:9090/graphql', (req) => {
      aliasMutation(req, 'watchNotification');
    });

    cy.get('[data-cy=list_notifications]').first().within(() => {
      cy.get('button').click();
    });

    cy.wait('@gqlwatchNotificationMutation')
        .its('response')
        .should((response) => expect(response.statusCode).to.eq(200))
        .should((response) => expect(response.body.data.watchNotification).to.have.property('unwatchedNotificationsCount'))
        .should((response) => expect(response.body.data.watchNotification.unwatchedNotificationsCount).to.eq(0));
  });

  it('Notification is watched', () => {
    cy.get('[data-cy=list_notifications]').first().within(() => {
      cy.get('button').should('not.exist');
    });
  });
});
