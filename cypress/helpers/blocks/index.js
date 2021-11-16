import { openSidebar, closeSidebar } from '../index';

export const changePageTitle = (title, delay = 10) => {
  // Change page title
  cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
    .clear()
    .type('My Add-on Page')
    .get('.documentFirstHeading span[data-text]')
    .contains('My Add-on Page');

  cy.get('.documentFirstHeading > .public-DraftStyleDefault-block').type(
    '{enter}',
  );
};

export const addBlock = (groupTitle, groupId, blockId) => {
  closeSidebar();
  cy.getIfExists('#page-edit div.block-editor-text', () => {
    cy.get('#page-edit div.block-editor-text').last().click();
  });
  cy.getIfExists('#page-edit div.block-editor-slate', () => {
    cy.get('#page-edit div.block-editor-slate').last().click();
  });
  cy.get('.ui.basic.icon.button.block-add-button').last().click();
  cy.getIfExists(
    `.content.active.${groupId}`,
    () => {
      cy.get(`.content.active.${groupId} .button.${blockId}`).click();
      cy.get(`#page-edit div.block-editor-${blockId}`);
      openSidebar();
    },
    () => {
      cy.get('.blocks-chooser .title').contains(groupTitle).click();
      cy.get(`.content.active.${groupId} .button.${blockId}`).click();
      cy.get(`#page-edit div.block-editor-${blockId}`);
      openSidebar();
    },
  );
};

export const selectBlock = (blockId) => {
  cy.get(`#page-edit div.block-editor-${blockId}`).click();
};
