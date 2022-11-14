import { openSidebar, closeSidebar } from '../index';

export const changePageTitle = (title, delay = 10) => {
  cy.get('[contenteditable=true]').first().clear();

  cy.get('[contenteditable=true]').first().type(title);

  cy.get('.documentFirstHeading').contains(title);

  cy.get('[contenteditable=true]').first().type('{enter}');
};

export const addBlock = (groupTitle, groupId, blockId) => {
  // closeSidebar();
  // cy.getIfExists('#page-edit div.block-editor-text', () => {
  //   cy.get('#page-edit div.block-editor-text').last().click();
  // });
  // cy.getIfExists('#page-edit div.block-editor-slate', () => {
  //   cy.get('#page-edit div.block-editor-slate').last().click();
  // });
  // cy.get('.ui.basic.icon.button.block-add-button').last().click();
  // cy.getIfExists(
  //   `.content.active.${groupId}`,
  //   () => {
  //     cy.get(`.content.active.${groupId} .button.${blockId}`).click();
  //     cy.get(`#page-edit div.block-editor-${blockId}`);
  //     openSidebar();
  //   },
  //   () => {
  //     cy.get('.blocks-chooser .title').contains(groupTitle).click();
  //     cy.get(`.content.active.${groupId} .button.${blockId}`).click();
  //     cy.get(`#page-edit div.block-editor-${blockId}`);
  //     openSidebar();
  //   },
  // );
};

export const selectBlock = (blockId) => {
  cy.get(`#page-edit div.block-editor-${blockId}`).click();
};
