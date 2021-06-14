import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Placeholder } from 'semantic-ui-react';
import { getBasePath } from '@eeacms/volto-datablocks/helpers';

function HeaderImage(props) {
  return props.url ? (
    <div className="header-image-wrapper">
      <LazyLoadImage
        className="header-image"
        // alt={image.alt}
        height={280}
        effect="blur"
        style={{ backgroundImage: `url(${getBasePath(props.url)})` }}
        width={'100%'}
        visibleByDefault={true}
        placeholder={
          <Placeholder>
            <Placeholder.Image rectangular />
          </Placeholder>
        }
      />
      <div className="header-image-overlay" />
      <div className="header-image-content" />
    </div>
  ) : (
    <Placeholder className="header-image">
      <Placeholder.Image rectangular />
      <div className="header-image-content" />
    </Placeholder>
  );

  // <div
  //   style={{ backgroundImage: `url(${props.url})` }}
  // >
  // </div>
}

export default HeaderImage;
