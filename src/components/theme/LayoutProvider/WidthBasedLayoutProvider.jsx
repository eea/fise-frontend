import React from 'react';
import componentQueries from 'react-component-queries';
import { compose } from 'redux';

const WidthBasedLayoutProvider = WrappedComponent => props => {
  return <WrappedComponent {...props} />;
};

export default compose(
  componentQueries(({ width }) => ({
    layout_type: (() => {
      if (width > 1600) {
        return 'widescreen';
      }
      if (width > 1200) {
        return 'desktop';
      }
      if (width > 767) {
        return 'tablet';
      }
      return 'phone';
    })(),
  })),
  WidthBasedLayoutProvider,
);
/* 767        768-1199      1200-1599     1600+
mobile     tablet         desktop       widescreen */
/* export const breakpoints = { lg: 1600, md: 1200, sm: 768, xs: 0, xxs: 0 }; */
