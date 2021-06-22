import { defineMessages } from 'react-intl';

import TokenWidget from '@plone/volto/components/manage/Widgets/TokenWidget';

import CountryView from '~/components/theme/CountryView/CountryView';
// import CountryPageView from '~/components/theme/CountryPageView/CountryPageView';
//import HomepageView from '~/components/theme/HomepageView/HomepageView';
import NewsView from '~/components/theme/NewsView/NewsView';
import RefreshView from '~/components/theme/RefreshView/RefreshView';

import chartIcon from '@plone/volto/icons/world.svg';

import DefaultViewWide from '~/components/theme/DefaultViewWide/DefaultViewWide';
import DefaultView from '~/customizations/volto/components/theme/View/DefaultView';

import ForestMetadata from '~/components/theme/Viewlets/ForestMetadata';

import NavigationBlockEdit from '~/components/manage/Blocks/NavigationBlock/Edit';
import NavigationBlockView from '~/components/manage/Blocks/NavigationBlock/View';

import RedirectView from '~/components/theme/View/RedirectView';
import { uniqBy } from 'lodash';

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

function addCustomGroup(config) {
  const hasCustomGroup = config.blocks.groupBlocksOrder.filter(
    (el) => el.id === 'custom_addons',
  );
  if (hasCustomGroup.length === 0) {
    config.blocks.groupBlocksOrder.push({
      id: 'custom_addons',
      title: 'Custom addons',
    });
  }
}

export function applyConfig(config) {
  addCustomGroup(config);
  config.settings = {
    ...config.settings,
    richTextEditorInlineToolbarButtons: [
      // Underline,
      ...config.settings.richTextEditorInlineToolbarButtons,
    ],
    nonContentRoutes: [
      // handled differently in getBaseUrl
      ...config.settings.nonContentRoutes,
      '/manage-slider',
      '/sitemap',
      '/unauthorized',
    ],
    ownDomain: 'forest.eea.europa.eu',
    matomoSiteId: 46,
    // ...['navigation', '&expand.navigation.depth=3'],
  };

  config.views = {
    ...config.views,
    layoutViews: {
      ...config.views.layoutViews,
      full_view: CountryView,
      // country_tab_view: CountryPageView,
      //homepage_view: HomepageView,
      // ...layoutViews,
      news_item_listing_view: NewsView,
      refresh_view: RefreshView,
      document_view_wide: DefaultViewWide,
      document_view: DefaultView,
      redirect_view: RedirectView,
    },
  };

  delete config.views.contentTypesViews['News Item'];
  delete config.views.contentTypesViews['Event'];

  // read @plone/volto/components/manage/Form/Field.jsx to understand this
  config.widgets = {
    ...config.widgets,
    vocabulary: {
      ...config.widgets.vocabulary,
      'fise.topics': TokenWidget,
      'fise.keywords': TokenWidget,
      'fise.publishers': TokenWidget,
    },
  };

  config.blocks = {
    ...config.blocks,

    groupBlocksOrder: [
      { id: 'common_blocks', title: 'Common blocks' },
      { id: 'forests_specific', title: 'Forests Specific Blocks' },
      ...uniqBy(config.blocks.groupBlocksOrder, 'id').filter(
        (block) => !['text', 'mostUsed', 'media', 'common'].includes(block.id),
      ),
    ],

    blocksConfig: {
      navigation_tabs_block: {
        id: 'navigation_tabs_block',
        title: 'Navigation tabs block',
        view: NavigationBlockView,
        edit: NavigationBlockEdit,
        icon: chartIcon,
        group: 'forests_specific',
      },
      ...Object.keys(config.blocks.blocksConfig).reduce((acc, blockKey) => {
        if (
          ['text', 'mostUsed', 'media', 'common'].includes(
            config.blocks.blocksConfig[blockKey].group,
          )
        ) {
          acc[blockKey] = {
            ...config.blocks.blocksConfig[blockKey],
            group: 'common_blocks',
          };
        } else {
          acc[blockKey] = config.blocks.blocksConfig[blockKey];
        }
        return acc;
      }, {}),
    },
  };

  config.viewlets = [
    { path: '/', component: ForestMetadata },
    ...(config.viewlets || []),
  ];

  config.settings.plotlyCustomColors = [
    {
      title: 'Forest Default',
      colorscale: [
        '#215511',
        '#77BB12',
        '#CBEE66',
        '#ffffff',
        '#F4F4F1',
        '#000000',
      ],
    },
    {
      title: 'Forest Active',
      colorscale: [
        '#CA4300 ',
        '#E0E1E2',
        '#E30166',
        '#074F7C',
        '#000000',
        '#ffffff',
      ],
    },
  ];

  // border-tile
  config.settings.pluggableStyles = [
    ...(config.settings.pluggableStyles || []),
    {
      id: 'borderBlock',
      title: 'Border block',
      cssClass: 'border-block',
    },
    {
      id: 'marginBlock10',
      title: 'Margin border',
      cssClass: 'margin-block-10 border-block',
    },
    {
      id: 'paddingBlock10',
      title: 'Padding border',
      cssClass: 'padding-block-10 border-block',
    },
    {
      id: 'paddingMarginBlock10',
      title: 'Padding margin border',
      cssClass: 'padding-block-10 margin-block-10 border-block',
    },
    {
      id: 'marginOnly10',
      title: 'Margin only',
      cssClass: 'margin-block-10',
    },
    {
      id: 'dropShadow',
      title: 'Drop shadow',
      cssClass: 'drop-shadow-tile',
    },
    {
      id: 'dropShadowMargin',
      title: 'Drop shadow margin',
      cssClass: 'drop-shadow-tile margin-block-10',
    },
    {
      id: 'dropShadowPadding',
      title: 'Drop shadow padding',
      cssClass: 'drop-shadow-tile padding-block-10',
    },
    {
      id: 'dropShadowPaddingMargin',
      title: 'Drop shadow padding margin',
      cssClass: 'drop-shadow-tile margin-block-10 padding-block-10',
    },
  ];
  // config.settings.search_portal_types = [
  //   'Event',
  //   'News Item',
  //   'Document',
  //   'templated_country_factsheet',
  //   'basic_data_factsheet',
  // ];
  return config;
}
