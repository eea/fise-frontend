/**
 * Replace with custom runner when needed.
 * @module index
 */

import start from 'volto-corsproxy/start-server';

const reloadServer = start();

if (module.hot) {
  reloadServer();
}
