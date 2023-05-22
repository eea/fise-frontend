/**
 * Routes.
 * @module routes
 */

import { App } from '@plone/volto/components';
import { defaultRoutes } from '@plone/volto/routes';
import config from '@plone/volto/registry';
import Header from '@eeacms/volto-forest-policy/components/theme/CatalogueViews/AppHeader.jsx';
import Footer from '@eeacms/volto-forest-policy/components/theme/CatalogueViews/AppFooter.jsx';
import Head from '@eeacms/volto-forest-policy/components/theme/CatalogueViews/AppHead.jsx';

/**
 * Routes array.
 * @array
 * @returns {array} Routes.
 */
const routes = [
  {
    path: '/header',
    component: Header,
  },
  {
    path: '/footer',
    component: Footer,
  },
  {
    path: '/head',
    component: Head,
  },
  {
    path: '/',
    component: App, // Change this if you want a different component
    routes: [
      // Add your routes here
      ...(config.addonRoutes || []),
      ...defaultRoutes,
    ],
  },
];

export default routes;
