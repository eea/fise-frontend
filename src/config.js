import * as config from '@plone/volto/config';

import Forbidden from '@plone/volto/components/theme/Forbidden/Forbidden';
import Unauthorized from '@plone/volto/components/theme/Unauthorized/Unauthorized';

import {
  applyConfig as addonsConfig,
  installImageSlides,
  installPortlets,
  installTableau,
  installNews,
} from 'volto-addons';
import { applyConfig as plotlyConfig } from 'volto-plotlycharts/config';
import { applyConfig as ckeditorConfig } from 'volto-ckeditor/config';
import { applyConfig as mosaicConfig } from 'volto-mosaic/config';
import { applyConfig as dataBlocksConfig } from 'volto-datablocks/config';
import { applyConfig as tabsViewConfig } from 'volto-tabsview/config';
import { applyConfig as installFiseFrontend } from './localconfig';
import { applyConfig as installEmbed } from 'volto-embed/config';

const consoleError = console.error.bind(console);
// eslint-disable-next-line
console.error = (message, ...args) => {
  if (typeof message === 'string' && message.startsWith('[React Intl]')) {
    return;
  }
  consoleError(message, ...args);
};

const addonConfig = [
  addonsConfig,
  installPortlets,
  installImageSlides,
  installTableau,
  installNews,
  plotlyConfig,
  ckeditorConfig,
  mosaicConfig,
  tabsViewConfig,
  installEmbed,
  // installSearch,
  dataBlocksConfig,
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
};

export const views = {
  // ...config.views,
  ...addonConfig.views,

  errorViews: {
    ...config.views.errorViews,
    '403': Forbidden,
    '401': Unauthorized,
  },
};

export const viewlets = [...(addonsConfig.viewlets || [])];

export const widgets = {
  ...addonConfig.widgets,
};

export const blocks = {
  ...addonConfig.blocks,
};

export const addonReducers = { ...config.addonReducers };
export const addonRoutes = [...(config.addonRoutes || [])];

export const portlets = {
  ...addonConfig.portlets,
};

export const editForms = {
  ...addonConfig.portlets,
};
