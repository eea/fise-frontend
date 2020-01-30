import React, { Component, Children } from 'react';
// import TableauReport from '~/components/theme/TableauView/TableauReport';
import componentQueries from 'react-component-queries';
import { compose } from 'redux';

const WidthBasedLayoutProvider = WrappedComponent => props => {
  return <WrappedComponent {...props} />;
};

export default compose(
  componentQueries(({ width }) => ({
    layout_type: (() => {
      if (width > 1549) {
        return 'widescreen';
      }
      if (width > 1086) {
        return 'desktop';
      }
      if (width > 768) {
        return 'tablet';
      }
      return 'phone';
    })(),
  })),
  WidthBasedLayoutProvider,
);
