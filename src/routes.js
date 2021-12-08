/**
 * Routes.
 * @module routes
 */

import { App } from '@plone/volto/components';
import { defaultRoutes } from '@plone/volto/routes';
import config from '@plone/volto/registry';
import SiteMap from '@eeacms/volto-forests-theme/components/theme/SiteMap/SiteMap';
import Header from '@eeacms/volto-forests-theme/components/theme/CatalogueViews/AppHeader.jsx';
import Footer from '@eeacms/volto-forests-theme/components/theme/CatalogueViews/AppFooter.jsx';
import Head from '@eeacms/volto-forests-theme/components/theme/CatalogueViews/AppHead.jsx';

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
        path: '/sitemap',
        component: SiteMap,
        exact: true,
      },
      ...(config.addonRoutes || []),
      ...defaultRoutes,
    ],
  },
];

export default routes;
