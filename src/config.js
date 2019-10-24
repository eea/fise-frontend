import React from 'react';

import {
  settings as defaultSettings,
  views as defaultViews,
  widgets as defaultWidgets,
  tiles as defaultTiles,
} from '@plone/volto/config';

import { defineMessages } from 'react-intl';
import TokenWidget from '@plone/volto/components/manage/Widgets/TokenWidget';
import HiddenWidget from '~/components/manage/Widgets/Hidden';
import CKEditorWidget from '~/components/manage/Widgets/CKEditor';
import ChartWidget from '~/components/manage/Widgets/Chart';

import ChartTileEdit from '~/components/manage/Tiles/ChartTile/ChartTileEdit';
import ChartTileView from '~/components/manage/Tiles/ChartTile/ChartTileView';

import EuropeCompareTileEdit from '~/components/manage/Tiles/EuropeCompareTile/Edit';
import EuropeCompareTileView from '~/components/manage/Tiles/EuropeCompareTile/View';

import EuropeForestTileEdit from '~/components/manage/Tiles/EuropeForestTile/Edit';
import EuropeForestTileView from '~/components/manage/Tiles/EuropeForestTile/View';

import PlotlyTileEdit from '~/components/manage/Tiles/PlotlyChart/Edit';
import PlotlyTileView from '~/components/manage/Tiles/PlotlyChart/View';

import TableauTileEdit from '~/components/manage/Tiles/TableauTile/TableauTileEdit';
import tableauTileView from '~/components/manage/Tiles/TableauTile/TableauTileView';

import TextTileEdit from '~/components/manage/Tiles/Text/Edit';
import TextTileView from '~/components/manage/Tiles/Text/View';

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

import { layoutViews } from '~/../volto-mosaic/src';

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
    tiles: HiddenWidget,
    tiles_layout: HiddenWidget,
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
    defaultMessage: 'Forests Specific Tiles',
  },
});

export const tiles = {
  ...defaultTiles,

  groupTilesOrder: [
    ...defaultTiles.groupTilesOrder,
    { id: 'custom_addons', title: 'Custom addons' },
    { id: 'forests_specific', title: 'Forests Specific Tiles' },
  ],

  tilesConfig: {
    ...defaultTiles.tilesConfig,
    europe_compare_tile: {
      id: 'europe_compare_tile',
      title: 'Europe Compare Tile',
      view: EuropeCompareTileView,
      edit: EuropeCompareTileEdit,
      icon: chartIcon,
      group: 'forests_specific',
    },
    europe_forest_tile: {
      id: 'europe_forest_tile',
      title: 'Europe Forest Area Tile',
      view: EuropeForestTileView,
      edit: EuropeForestTileEdit,
      icon: chartIcon,
      group: 'forests_specific',
    },
    embed_chart: {
      id: 'embed_chart',
      title: 'Embed Chart',
      view: ChartTileView,
      edit: ChartTileEdit,
      icon: chartIcon,
      group: 'custom_addons',
    },
    plotly_chart: {
      id: 'plotly_chart',
      title: 'Plotly Chart',
      view: PlotlyTileView,
      edit: PlotlyTileEdit,
      icon: chartIcon,
      group: 'custom_addons',
    },
    tableau: {
      id: 'tableau',
      title: 'Tableau',
      view: tableauTileView,
      edit: TableauTileEdit,
      icon: chartIcon,
      group: 'custom_addons',
    },
    cktext: {
      id: 'cktext',
      group: 'text',
      title: 'CKEditor',
      view: TextTileView,
      edit: TextTileEdit,
      icon: defaultTiles.tilesConfig.text.icon,
    },
  },
};

export const portlets = [ForestMetadata, SliderEditButton];
