import React from 'react';
import HomepageSliderPlaceholder from './HomepageSliderPlaceholder';

function Loading(props) {
  switch (props) {
    case 'HomepageSlider':
      return HomepageSliderPlaceholder;
      break;
    default:
      break;
  }
}

export default Loading;
