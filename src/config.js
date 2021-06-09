import Forbidden from '@plone/volto/components/theme/Forbidden/Forbidden';
import Unauthorized from '@plone/volto/components/theme/Unauthorized/Unauthorized';

// import {
// applyConfig as addonsConfig,
// installImageSlides,
// installPortlets,
// installTableau,
// installNews,
// } from 'volto-addons/config';
// import { applyConfig as plotlyConfig } from 'volto-plotlycharts/config';
import { installBlocks } from 'volto-plotlycharts';
// import { applyConfig as ckeditorConfig } from 'volto-ckeditor/config';
// import { applyConfig as mosaicConfig } from 'volto-mosaic/config';
// import { applyConfig as dataBlocksConfig } from 'volto-datablocks/config';
import { applyConfig as installFiseFrontend } from './localconfig';
// import { applyConfig as installEmbed } from 'volto-embed/config';

import ObjectListInlineWidget from './components/manage/Widgets/ObjectListInlineWidget';
import reducers from '~/reducers';

// const config = [
//   // addonsConfig,
//   installBlocks,
//   // installPortlets,
//   // installImageSlides,
//   // installTableau,
//   // installNews,
//   // plotlyConfig,
//   ckeditorConfig,
//   mosaicConfig,
//   // installEmbed,
//   // installSearch,
//   // dataBlocksConfig,
//   installFiseFrontend,
// ].reduce((acc, apply) => apply(acc), voltoConfig);

import '@plone/volto/config';

export default function applyConfig(config) {
  // Add here your project's configuration here by modifying `config` accordingly
  config = [installBlocks, installFiseFrontend].reduce(
    (acc, apply) => apply(acc),
    config,
  );

  config.settings = {
    ...config.settings,
    frontendMeta: {
      version: process.env.RAZZLE_FRONTEND_VERSION || null,
      version_url: process.env.RAZZLE_FRONTEND_VERSION_URL || null,
      published_at: process.env.RAZZLE_FRONTEND_PUBLISHED_AT || null,
    },
    timezone: 'CET',
    matomoSiteId: 46,
    pathsWithFullobjects: ['/news', '/events'],
    pathsWithExtraParameters: {
      '/news': { b_start: 0, b_size: 1000 },
      '/events': { b_start: 0, b_size: 1000 },
    },
  };

  config.views = {
    ...config.views,
    errorViews: {
      ...config.views.errorViews,
      '403': Forbidden,
      '401': Unauthorized,
    },
  };

  config.widgets = {
    ...config.widgets,
    widget: {
      ...config.widgets.widget,
      object_list_inline: ObjectListInlineWidget,
    },
  };

  // // TODO: should we move custom stuff to settings variable?
  // // It would make future adding new settings types easier, as this file wouldn't
  // // have to be updated in all frontend implementations
  // // console.log('config.js AddonReducers', config.addonReducers);
  // export const addonReducers = { ...config.addonReducers };
  // export const addonRoutes = [...(config.addonRoutes || [])];

  config.viewlets = [...(config.viewlets || [])];
  config.addonReducers = { ...config.addonReducers, ...reducers };

  // export const portlets = {
  //   ...config.portlets,
  // };

  config.editForms = {
    ...config.editForms,
  };
  return config;
}
