// / <reference types="cypress" />
const ms = require('smtp-tester');
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  const port = 465;
  const mailServer = ms.init(port);
  console.log('mail server at port %d', port);

  // [receiver email]: email text
  let lastEmail = {};

  on('task', {
    resetEmails(email) {
      console.log('reset all emails');
      if (email) {
        delete lastEmail[email];
      } else {
        lastEmail = {};
      }
      return null;
    },

    getLastEmail(email) {
      // cy.task cannot return undefined
      // thus we return null as a fallback
      return lastEmail[email] || null;
    },
  });

  // process all emails
  mailServer.bind((addr, id, email) => {
    console.log('--- email ---');
    console.log(addr, id, email);
    lastEmail[email.headers.to] = email.html || email.body;
  });
};
