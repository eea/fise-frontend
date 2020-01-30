import React from 'react';
import componentQueries from 'react-component-queries';
import { compose } from 'redux';

const WidthBasedLayoutProvider = WrappedComponent => props => {
  return <WrappedComponent {...props} />;
};
/* 767        768-1199      1200-1599     1600+
mobile     tablet         desktop       widescreen */

export default compose(
  componentQueries(({ width }) => ({
    layout_type: (() => {
      if (width > 1600 - 50) {
        return 'widescreen';
      }
      if (width > 1200 - 50) {
        return 'desktop';
      }
      if (width > 767 - 50) {
        return 'tablet';
      }
      return 'phone';
    })(),
  })),
  WidthBasedLayoutProvider,
);

/* export const breakpoints = { lg: 1600, md: 1200, sm: 768, xs: 0, xxs: 0 }; */
