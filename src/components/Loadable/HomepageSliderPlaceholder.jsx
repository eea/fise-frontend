import React from 'react';
import { Placeholder } from 'semantic-ui-react';

function HomepageSliderPlaceholder() {
  return (
    <div className="slider-wrapper">
      <div className="mainSlider">
        <div className="slider-image">
          <Placeholder>
            <Placeholder.Image rectangular />
          </Placeholder>
        </div>
      </div>
    </div>
  );
}

export default HomepageSliderPlaceholder;
