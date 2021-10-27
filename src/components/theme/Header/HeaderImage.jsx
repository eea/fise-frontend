import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Placeholder } from 'semantic-ui-react';
import { flattenToAppURL } from '@plone/volto/helpers';
import HeaderNavigation from './HeaderNavigation';

function HeaderImage(props) {
  const isBig = props.bigImage ? props.bigImage : false;
  const headerDimension = isBig ? 600 : 280;

  console.log('navinhead', props.navigationItems);
  return props.url ? (
    <div className={`header-image-wrapper ${isBig ? 'header-image-big' : ''}`}>
      <LazyLoadImage
        className="header-image"
        // alt={image.alt}
        height={headerDimension}
        effect="blur"
        style={{ backgroundImage: `url(${flattenToAppURL(props.url)})` }}
        width={'100%'}
        visibleByDefault={true}
        placeholder={
          <Placeholder>
            <Placeholder.Image rectangular />
          </Placeholder>
        }
      />
      {props.metadata && (
        <div
          className="header-meta-data"
          dangerouslySetInnerHTML={{ __html: props.metadata }}
        />
      )}
      {props.navigationItems && props.leadNavigation && (
        <HeaderNavigation items={props.navigationItems} />
      )}
      <div className="header-image-overlay" />
      <div className="header-image-content" />
    </div>
  ) : (
    <Placeholder className="header-image">
      <Placeholder.Image rectangular />
      <div className="header-image-content" />
    </Placeholder>
  );
}

export default HeaderImage;
