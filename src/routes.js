/**
 * Routes.
 * @module routes
 */

import { App } from '@plone/volto/components';
import { defaultRoutes } from '@plone/volto/routes';
import HomepageView from '~/components/theme/HomepageView/HomepageView';

import { addonRoutes } from '~/config';

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
        path: '/',
        component: HomepageView,
        exact: true,
      },

      // addon routes have a higher priority then default routes
      ...(addonRoutes || []),

      ...defaultRoutes,
    ],
  },
];

export default routes;
