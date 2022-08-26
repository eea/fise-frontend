/**
 * Add your config changes here.
 * @module config
 * @example
 * export default function applyConfig(config) {
 *   config.settings = {
 *     ...config.settings,
 *     port: 4300,
 *     listBlockTypes: {
 *       ...config.settings.listBlockTypes,
 *       'my-list-item',
 *    }
 * }
 */

// All your imports required for the config here BEFORE this line
import '@plone/volto/config';

//remove Map block for now
export default function applyConfig(config) {
  if (config.blocks.blocksConfig.maps) {
    delete config.blocks.blocksConfig.maps;
  }
  // Add here your project's configuration here by modifying `config` accordingly
  return config;
}
