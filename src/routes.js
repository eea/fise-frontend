/**
 * Routes.
 * @module routes
 */

import { App } from '@plone/volto/components';
import { defaultRoutes } from '@plone/volto/routes';
import { EditMosaic } from '../volto-mosaic/src';

import MosaicSettingsView from '~/components/theme/TestViews/MosaicSettingsView';
import DataProvidersView from '~/components/theme/TestViews/DataProvidersView';

/**
 * Routes array.
 * @array
 * @returns {array} Routes.
 */
const routes = [
  {
    path: '/',
    component: App, // Change this if you want a different component
    routes: [
      // Add your routes here
      {
        path: '/edit',
        component: EditMosaic,
      },
      {
        path: '*/**/edit',
        component: EditMosaic,
      },

      // test routes
      {
        path: '*/mosaic-settings-view',
        component: MosaicSettingsView,
      },
      {
        path: '*/data-providers-view',
        component: DataProvidersView,
      },
      ...defaultRoutes,
    ],
  },
];

export default routes;
