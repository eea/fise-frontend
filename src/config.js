import * as voltoConfig from '@plone/volto/config';
import Forbidden from '@plone/volto/components/theme/Forbidden/Forbidden';
import Unauthorized from '@plone/volto/components/theme/Unauthorized/Unauthorized';

// import {
// applyConfig as addonsConfig,
// installImageSlides,
// installPortlets,
// installTableau,
// installNews,
// } from 'volto-addons/config';
import { applyConfig as plotlyConfig } from 'volto-plotlycharts/config';
// import { installBlocks } from 'volto-plotlycharts';
import { applyConfig as ckeditorConfig } from 'volto-ckeditor/config';
import { applyConfig as mosaicConfig } from 'volto-mosaic/config';
// import { applyConfig as dataBlocksConfig } from 'volto-datablocks/config';
import { applyConfig as installFiseFrontend } from './localconfig';
import { applyConfig as installEmbed } from 'volto-embed/config';

import ObjectListInlineWidget from './components/manage/Widgets/ObjectListInlineWidget';

const config = [
  // addonsConfig,
  // installBlocks,
  // installPortlets,
  // installImageSlides,
  // installTableau,
  // installNews,
  plotlyConfig,
  ckeditorConfig,
  mosaicConfig,
  installEmbed,
  // installSearch,
  // dataBlocksConfig,
  installFiseFrontend,
].reduce((acc, apply) => apply(acc), voltoConfig);

export const settings = {
  ...config.settings,
  frontendMeta: {
    version: process.env.RAZZLE_FRONTEND_VERSION || null,
    version_url: process.env.RAZZLE_FRONTEND_VERSION_URL || null,
    published_at: process.env.RAZZLE_FRONTEND_PUBLISHED_AT || null,
  },
  timezone: 'CET',
  matomoSiteId: 46,
};

// RAZZLE_MATOMO_SITE_ID

export const views = {
  ...config.views,
  errorViews: {
    ...config.views.errorViews,
    '403': Forbidden,
    '401': Unauthorized,
  },
};

export const widgets = {
  ...config.widgets,
  widget: {
    ...config.widgets.widget,
    object_list_inline: ObjectListInlineWidget,
  },
};

export const blocks = {
  ...config.blocks,
};

// TODO: should we move custom stuff to settings variable?
// It would make future adding new settings types easier, as this file wouldn't
// have to be updated in all frontend implementations
// console.log('config.js AddonReducers', config.addonReducers);
export const addonReducers = { ...config.addonReducers };
export const addonRoutes = [...(config.addonRoutes || [])];

export const viewlets = [...(config.viewlets || [])];

export const portlets = {
  ...config.portlets,
};

export const editForms = {
  ...config.editForms,
};
