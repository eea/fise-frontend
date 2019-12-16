/**
 * Replace with custom client implementation when needed.
 * @module client
 */

//  TODO Mihai: remove this when route change animation is implemented in volto

import client from './start-client';

console.log('Starting');
client();

if (module.hot) {
  module.hot.accept();
}
