/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { defineMessages, injectIntl } from 'react-intl';
import LogoImage from '@plone/volto/components/theme/Logo/Logo.svg';
import LogoImageSm from './Logo-sm.svg';
import LogoImageWithoutText from './LogoImg.svg';
import LogoImageSmWithoutText from './LogoImg-sm.svg';
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
      className="logoImage computer large screen widescreen only"
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
      className="logoImageSm computer large screen widescreen only"
      // alt={image.alt}
      height={65}
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
    <LazyLoadImage
      className="logoImage computer hidden large screen hidden widescreen hidden"
      // alt={image.alt}
      height={80}
      effect="blur"
      src={LogoImageWithoutText}
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
      className="logoImageSm computer hidden large screen hidden widescreen hidden"
      // alt={image.alt}
      height={65}
      effect="blur"
      src={LogoImageSmWithoutText}
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
