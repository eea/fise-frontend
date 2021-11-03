/**
 * Routes.
 * @module routes
 */
import { App } from '@plone/volto/components';
import { defaultRoutes } from '@plone/volto/routes';
// import HomepageView from '~/components/theme/HomepageView/HomepageView';

import config from '@plone/volto/registry';
import SiteMap from '~/components/theme/SiteMap/SiteMap';
import Header from '~/components/theme/CatalogueViews/AppHeader.jsx';
import Footer from '~/components/theme/CatalogueViews/AppFooter.jsx';
import Head from '~/components/theme/CatalogueViews/AppHead.jsx';

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

      {
        path: '/sitemap',
        component: SiteMap,
        exact: true,
      },
      // addon routes have a higher priority then default routes
      ...(config.addonRoutes || []),

      ...defaultRoutes,
    ],
  },
];

export default routes;
