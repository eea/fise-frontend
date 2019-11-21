import React from 'react';

import { defineMessages } from 'react-intl';

import TokenWidget from '@plone/volto/components/manage/Widgets/TokenWidget';

import EuropeCompareBlockEdit from './components/manage/Blocks/EuropeCompareBlock/Edit';
import EuropeCompareBlockView from './components/manage/Blocks/EuropeCompareBlock/View';

import EuropeForestBlockEdit from './components/manage/Blocks/EuropeForestBlock/Edit';
import EuropeForestBlockView from './components/manage/Blocks/EuropeForestBlock/View';

import ForestMetadata from '~/components/theme/Portlets/ForestMetadata';
// import SliderEditButton from '~/components/manage/Slider/Portlet';

// Display types
import CountryView from '~/components/theme/CountryView/CountryView';
import CountryPageView from '~/components/theme/CountryPageView/CountryPageView';
import HomepageView from '~/components/theme/HomepageView/HomepageView';

import createInlineStyleButton from 'draft-js-buttons/lib/utils/createInlineStyleButton';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import underlineSVG from '@plone/volto/icons/underline.svg';
import chartIcon from '@plone/volto/icons/world.svg';

import * as voltoConfig from '@plone/volto/config';

import { applyConfig as addonsConfig } from 'volto-addons/config';
import { applyConfig as plotlyConfig } from 'volto-plotlycharts/config';
import { applyConfig as ckeditorConfig } from 'volto-ckeditor/config';
import { applyConfig as draftConfig } from 'volto-drafteditor/config';
import { applyConfig as mosaicConfig } from 'volto-mosaic/config';
import { applyConfig as dataBlocksConfig } from 'volto-datablocks/config';
const util = require('util');

const config = [
  addonsConfig,
  plotlyConfig,
  ckeditorConfig,
  draftConfig,
  mosaicConfig,
  dataBlocksConfig,
].reduce((acc, apply) => apply(acc), voltoConfig);

const Underline = createInlineStyleButton({
  style: 'UNDERLINE',
  children: <Icon name={underlineSVG} size="24px" />,
});

export const settings = {
  ...config.settings,
  richTextEditorInlineToolbarButtons: [
    Underline,
    ...config.settings.richTextEditorInlineToolbarButtons,
  ],
  nonContentRoutes: [
    // handled differently in getBaseUrl
    ...config.settings.nonContentRoutes,
    '/manage-slider',
  ],
};

export const views = {
  ...config.views,
  layoutViews: {
    ...config.views.layoutViews,
    full_view: CountryView,
    country_tab_view: CountryPageView,
    homepage_view: HomepageView,
    // ...layoutViews,
  },
};

// read @plone/volto/components/manage/Form/Field.jsx to understand this
export const widgets = {
  ...config.widgets,
  vocabulary: {
    ...config.widgets.vocabulary,
    'fise.topics': TokenWidget,
    'fise.keywords': TokenWidget,
    'fise.publishers': TokenWidget,
  },
};

defineMessages({
  custom_addons: {
    id: 'custom_addons',
    defaultMessage: 'Custom Addons',
  },
  plotly_chart: {
    id: 'plotly_chart',
    defaultMessage: 'Plotly Chart',
  },
  demo_chart: {
    id: 'demo_chart',
    defaultMessage: 'Demo Chart',
  },
  tableau: {
    id: 'tableau',
    defaultMessage: 'Tableau',
  },
  forests_specific: {
    id: 'forests_specific',
    defaultMessage: 'Forests Specific Blocks',
  },
});

export const blocks = {
  ...config.blocks,

  groupBlocksOrder: [
    ...config.blocks.groupBlocksOrder,
    { id: 'custom_addons', title: 'Custom addons' }, // TODO: needs to be fixed
    { id: 'forests_specific', title: 'Forests Specific Blocks' },
  ],

  blocksConfig: {
    ...config.blocks.blocksConfig,
    europe_compare_block: {
      id: 'europe_compare_block',
      title: 'Europe Compare Block',
      view: EuropeCompareBlockView,
      edit: EuropeCompareBlockEdit,
      icon: chartIcon,
      group: 'forests_specific',
    },
    europe_forest_block: {
      id: 'europe_forest_block',
      title: 'Europe Forest Area Block',
      view: EuropeForestBlockView,
      edit: EuropeForestBlockEdit,
      icon: chartIcon,
      group: 'forests_specific',
    },
  },
};

export const portlets = [ForestMetadata]; // SliderEditButton
export const addonReducers = { ...config.addonReducers };
export const addonRoutes = [...(config.addonRoutes || [])];

console.log('last logged config', util.inspect(config, false, null, true));
