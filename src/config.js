import React from 'react';

import {
  settings as defaultSettings,
  views as defaultViews,
  widgets as defaultWidgets,
  blocks as defaultBlocks,
} from '@plone/volto/config';

import { defineMessages } from 'react-intl';
import TokenWidget from '@plone/volto/components/manage/Widgets/TokenWidget';
import HiddenWidget from '~/components/manage/Widgets/Hidden';
import CKEditorWidget from '~/components/manage/Widgets/CKEditor';
import ChartWidget from '~/components/manage/Widgets/Chart';

import ChartBlockEdit from 'volto-blocks/ChartBlock/ChartBlockEdit';
import ChartBlockView from 'volto-blocks/ChartBlock/ChartBlockView';

import EuropeCompareBlockEdit from 'volto-blocks/EuropeCompareBlock/Edit';
import EuropeCompareBlockView from 'volto-blocks/EuropeCompareBlock/View';

import EuropeForestBlockEdit from 'volto-blocks/EuropeForestBlock/Edit';
import EuropeForestBlockView from 'volto-blocks/EuropeForestBlock/View';

import PlotlyBlockEdit from 'volto-blocks/PlotlyChart/Edit';
import PlotlyBlockView from 'volto-blocks/PlotlyChart/View';

import TableauBlockEdit from 'volto-blocks/TableauBlock/TableauBlockEdit';
import tableauBlockView from 'volto-blocks/TableauBlock/TableauBlockView';

import TextBlockEdit from 'volto-blocks/Text/Edit';
import TextBlockView from 'volto-blocks/Text/View';

import ForestMetadata from '~/components/theme/Portlets/ForestMetadata';
import SliderEditButton from '~/components/manage/Slider/Portlet';

// Display types
import CountryView from '~/components/theme/CountryView/CountryView';
import CountryPageView from '~/components/theme/CountryPageView/CountryPageView';
import HomepageView from '~/components/theme/HomepageView/HomepageView';
import VisualizationView from '~/components/theme/VisualizationView/View';

import createInlineStyleButton from 'draft-js-buttons/lib/utils/createInlineStyleButton';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import underlineSVG from '@plone/volto/icons/underline.svg';
import chartIcon from '@plone/volto/icons/world.svg';

import { layoutViews } from 'volto-mosaic';

const Underline = createInlineStyleButton({
  style: 'UNDERLINE',
  children: <Icon name={underlineSVG} size="24px" />,
});

export const settings = {
  ...defaultSettings,
  richTextEditorInlineToolbarButtons: [
    Underline,
    ...defaultSettings.richTextEditorInlineToolbarButtons,
  ],
  nonContentRoutes: [
    // handled differently in getBaseUrl
    ...defaultSettings.nonContentRoutes,
    '/manage-slider',
    '/mosaic-settings-view',
    '/data-providers-view',
  ],
};

export const views = {
  ...defaultViews,
  layoutViews: {
    ...defaultViews.layoutViews,
    full_view: CountryView,
    country_tab_view: CountryPageView,
    homepage_view: HomepageView,
    ...layoutViews,
  },
  contentTypesViews: {
    ...defaultViews.contentTypesViews,
    visualization: VisualizationView,
  },
};

// read @plone/volto/components/manage/Form/Field.jsx to understand this
export const widgets = {
  ...defaultWidgets,
  vocabulary: {
    ...defaultWidgets.vocabulary,
    'fise.topics': TokenWidget,
    'fise.keywords': TokenWidget,
    'fise.publishers': TokenWidget,
  },
  id: {
    ...defaultWidgets.id,
    blocks: HiddenWidget,
    blocks_layout: HiddenWidget,
    visualization: ChartWidget,
  },
  widget: {
    ...defaultWidgets.widget,
    cktext: CKEditorWidget,
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
  ...defaultBlocks,

  groupBlocksOrder: [
    ...defaultBlocks.groupBlocksOrder,
    { id: 'custom_addons', title: 'Custom addons' },
    { id: 'forests_specific', title: 'Forests Specific Blocks' },
  ],

  blocksConfig: {
    ...defaultBlocks.blocksConfig,
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
    embed_chart: {
      id: 'embed_chart',
      title: 'Embed Chart',
      view: ChartBlockView,
      edit: ChartBlockEdit,
      icon: chartIcon,
      group: 'custom_addons',
    },
    plotly_chart: {
      id: 'plotly_chart',
      title: 'Plotly Chart',
      view: PlotlyBlockView,
      edit: PlotlyBlockEdit,
      icon: chartIcon,
      group: 'custom_addons',
    },
    tableau: {
      id: 'tableau',
      title: 'Tableau',
      view: tableauBlockView,
      edit: TableauBlockEdit,
      icon: chartIcon,
      group: 'custom_addons',
    },
    cktext: {
      id: 'cktext',
      group: 'text',
      title: 'CKEditor',
      view: TextBlockView,
      edit: TextBlockEdit,
      icon: defaultBlocks.blocksConfig.text.icon,
    },
  },
};

export const portlets = [ForestMetadata, SliderEditButton];
