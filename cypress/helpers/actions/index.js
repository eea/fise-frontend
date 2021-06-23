export const save = (path) => {
  cy.url().then(($url) => {
    if ($url.includes(path)) {
      //cy.get('.ui.button.save').click();
      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + path);
    } else {
      cy.log('Wrong path');
    }
  });
};

export const cancel = (path) => {
  cy.url().then(($url) => {
    if ($url.includes(path)) {
      cy.get('.ui.button.cancel').click();
      cy.url().should('eq', Cypress.config().baseUrl + path);
    } else {
      cy.log('Wrong path');
    }
  });
};
