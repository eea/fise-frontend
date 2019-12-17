// import SliderEditButton from '~/components/manage/Slider/Portlet';

import * as voltoConfig from '@plone/volto/config';

import {
  applyConfig as addonsConfig,
  installImageSlides,
  installPortlets,
} from 'volto-addons/config';
import { applyConfig as plotlyConfig } from 'volto-plotlycharts/config';
import { applyConfig as ckeditorConfig } from 'volto-ckeditor/config';
// import { applyConfig as draftConfig } from 'volto-drafteditor/config';
import { applyConfig as mosaicConfig } from 'volto-mosaic/config';
import { applyConfig as dataBlocksConfig } from 'volto-datablocks/config';
import { applyConfig as installFiseFrontend } from './localconfig';

const config = [
  addonsConfig,
  installImageSlides,
  installPortlets,
  plotlyConfig,
  ckeditorConfig,
  // draftConfig,
  mosaicConfig,
  dataBlocksConfig,
  installFiseFrontend,
].reduce((acc, apply) => apply(acc), voltoConfig);

export const settings = {
  ...config.settings,
};

export const views = {
  ...config.views,
};

// console.log('config views', views);

// read @plone/volto/components/manage/Form/Field.jsx to understand this
export const widgets = {
  ...config.widgets,
};

export const blocks = {
  ...config.blocks,
};

export const addonReducers = { ...config.addonReducers };
export const addonRoutes = [...(config.addonRoutes || [])];

export const viewlets = [...(config.viewlets || [])];

export const portlets = {
  ...config.portlets,
};
