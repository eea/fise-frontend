/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { defineMessages, injectIntl } from 'react-intl';
import { Image } from 'semantic-ui-react';
import LogoImage from '@plone/volto/components/theme/Logo/Logo.svg';
import LogoImageSm from './Logo-sm.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Placeholder } from 'semantic-ui-react';

const messages = defineMessages({
  site: {
    id: 'Site',
    defaultMessage: 'Site',
  },
  plonesite: {
    id: 'Plone Site',
    defaultMessage: 'Plone Site',
  },
});

/**
 * Logo component class.
 * @function Logo
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component.
 */
const Logo = ({ intl }) => (
  <Link to="/" title={intl.formatMessage(messages.site)}>
    <LazyLoadImage
      className="logoImage"
      // alt={image.alt}
      height={80}
      effect="blur"
      src={LogoImage}
      alt={intl.formatMessage(messages.plonesite)}
      title={intl.formatMessage(messages.plonesite)}
      visibleByDefault={true}
      placeholder={
        <Placeholder>
          <Placeholder.Image rectangular />
        </Placeholder>
      }
    />
    <LazyLoadImage
      className="logoImageSm"
      // alt={image.alt}
      height={80}
      effect="blur"
      src={LogoImageSm}
      alt={intl.formatMessage(messages.plonesite)}
      title={intl.formatMessage(messages.plonesite)}
      visibleByDefault={true}
      placeholder={
        <Placeholder>
          <Placeholder.Image rectangular />
        </Placeholder>
      }
    />
  </Link>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Logo.propTypes = {};

export default injectIntl(Logo);
