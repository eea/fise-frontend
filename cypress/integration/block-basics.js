import { setupBeforeEach, tearDownAfterEach } from '../support';
import { addBlock, save } from '../helpers';

describe('Blocks Tests', () => {
  beforeEach(setupBeforeEach);
  afterEach(tearDownAfterEach);

  it('Add Block: Empty', () => {
    // Change page title
    // Add block
    addBlock('Common blocks', 'common_blocks', 'image');
    // Save
    save('/cypress/my-page');
    // then the page view should contain our changes
    cy.contains('My Page');
    cy.get('.block.image');
  });
});
