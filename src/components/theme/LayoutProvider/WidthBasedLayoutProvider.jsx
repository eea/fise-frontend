import React from 'react';
import componentQueries from 'react-component-queries';
import { compose } from 'redux';
// import mosaic_width from '../../../addons/volto-mosaic/src/reducers/mosaic_width';
import { connect } from 'react-redux';

const WidthBasedLayoutProvider = WrappedComponent => props => {
  return <WrappedComponent {...props} />;
};

const connectedWidthProvider = compose(
  connect(state => ({
    mosaic_width: state.mosaic_width.items,
  })),
  componentQueries({
    queries: [
      ({ width }, { mosaic_width }) => ({
        layout_type: (() => {
          // const width = 120
          // windowWidth - gridLayoutWidth = margins
          const mosaic_breakpoints = {
            tablet: 767,
            desktop: 1200,
            widescreen: 1600,
          };

          // console.log('props in queries', width, mosaic_width);
          const windowWidth = __CLIENT__ && window.innerWidth;
          const margins = windowWidth - mosaic_width;
          const breakpoint = screentype =>
            windowWidth
              ? mosaic_breakpoints[screentype] - margins
              : mosaic_breakpoints[screentype];

          console.debug(
            'breakpoints',
            width,
            '====>',
            'widescreen =>',
            breakpoint('widescreen'),
            'desktop =>',
            breakpoint('desktop'),
            'tablet =>',
            breakpoint('tablet'),
            'Window =>',
            windowWidth,
            'mosaic =>',
            mosaic_width,
            'margins =>',
            margins,
          );

          if (__SERVER__) {
            return 'widescreen';
          }
          if (width > breakpoint('widescreen')) {
            return 'widescreen';
          }
          if (width > breakpoint('desktop')) {
            return 'desktop';
          }
          if (width > breakpoint('tablet')) {
            return 'tablet';
          }
          return 'phone';
        })(),
      }),
    ],
  }),
  WidthBasedLayoutProvider,
);

export default connectedWidthProvider;
