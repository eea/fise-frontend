/**
 * Root reducer.
 * @module reducers/root
 */

import defaultReducers from '@plone/volto/reducers';
import frontpage_slides from '~/reducers/frontpage_slides';
import folder_header from '~/reducers/folder_header';
import folder_tabs from '~/reducers/folder_tabs';
import default_header_image from '~/reducers/default_header_image';
import mosaic_settings from '~/reducers/mosaic_settings';
import data_providers from '~/reducers/data_providers';
import parent_folder_data from '~/reducers/parent_folder_data';
import localnavigation from '~/reducers/localnavigation';
import chart_data_visualization from './chart_data_visualization';
import attachments from './attachments';

/**
 * Root reducer.
 * @function
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
const reducers = {
  ...defaultReducers,
  // Add your reducers here
  frontpage_slides,
  folder_header,
  default_header_image,
  folder_tabs,
  parent_folder_data,
  mosaic_settings,
  data_providers,
  localnavigation,
  chart_data_visualization,
  attachments,
};

export default reducers;
