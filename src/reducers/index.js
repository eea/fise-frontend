/**
 * Root reducer.
 * @module reducers/root
 */

import defaultReducers from '@plone/volto/reducers';
import frontpage_slides from '~/reducers/frontpage_slides';
import folder_header from '~/reducers/folder_header';
import folder_tabs from '~/reducers/folder_tabs';
import default_header_image from '~/reducers/default_header_image';
import parent_folder_data from '~/reducers/parent_folder_data';
import localnavigation from '~/reducers/localnavigation';
import navSiteMap from '~/reducers/sitemap';
import { addonReducers } from '~/config';

/**
 * Root reducer.
 * @function
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
const reducers = {
  ...defaultReducers,
  ...addonReducers,
  // Add your reducers here
  frontpage_slides,
  folder_header,
  default_header_image,
  folder_tabs,
  parent_folder_data,
  localnavigation,
  navSiteMap
};

export default reducers;
