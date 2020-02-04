/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { Container, List, Segment, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import footerImage from './footer.png';
import LogoImage from '@plone/volto/components/theme/Logo/Logo.svg';
import ecLogo from './ec.png';
import eeaLogo from './eea.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Placeholder } from 'semantic-ui-react';

const messages = defineMessages({
  copyright: {
    id: 'Copyright',
    defaultMessage: 'Copyright',
  },
});

/**
 * Component to display the footer.
 * @function Footer
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component
 */
const Footer = ({ intl }) => (
  <Segment
    role="contentinfo"
    vertical
    padded
    // textAlign="center"
    className="footerWrapper"
  >
    <img className="footerImage" src={footerImage} alt="" />
    <Container>
      <div className="ui vertically divided grid">
        <div className="four column row">
          <div className="column">
            <b>ABOUT</b>
            <p>
              FISE - Forest Information System for Europe is a forest knowledge
              base in support of the EU Forest Strategy.{' '}
              {/* <a href="#">See more</a> */}
            </p>
            <LazyLoadImage
              className="footerLogo"
              style={{ width: '250px', marginTop: '2rem' }}
              effect="blur"
              src={LogoImage}
              alt="Forest"
              title="FISE"
              // alt={intl.formatMessage(messages.plonesite)}
              // title={intl.formatMessage(messages.plonesite)}
              width={'100%'}
              visibleByDefault={true}
              placeholder={
                <Placeholder>
                  <Placeholder.Image rectangular />
                </Placeholder>
              }
            />
          </div>

          <div style={{ flexGrow: '1' }} className="column">
            <b>DISCLAIMER</b>
            <p>
              Withdrawal of the United Kingdom from the European Union:
              <i>
                Data reported by the United Kingdom are included in all analyses
                and assessments contained herein, unless otherwise indicated.
              </i>
            </p>
          </div>

          <div
            style={{ width: '200px!important' }}
            className="column"
            id="links_column"
          >
            <b>LINKS</b>
            <ul className="unlist">
              <li>
                <Link className="item" to="/legal_notice">
                  <FormattedMessage
                    id="legal_notice"
                    defaultMessage="Legal notice"
                  />
                </Link>
              </li>

              <li>
                <Link className="item" to="/privacy_policy">
                  <FormattedMessage
                    id="privacy_policy"
                    defaultMessage="Privacy statement"
                  />
                </Link>
              </li>
              <li>
                <a className="item" href={`mailto:info@eea.europa.eu`}>
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          <div className="column">
            <b>PARTNERS</b>
            <div className="footerLogoWrapper">
              <a href="https://ec.europa.eu/" title="European Commission">
                <LazyLoadImage
                  className="footerLogo"
                  // height={80}
                  effect="blur"
                  src={ecLogo}
                  alt="European Commission"
                  title="European Commission"
                  // alt={intl.formatMessage(messages.plonesite)}
                  // title={intl.formatMessage(messages.plonesite)}
                  width={'100%'}
                  visibleByDefault={true}
                  placeholder={
                    <Placeholder>
                      <Placeholder.Image rectangular />
                    </Placeholder>
                  }
                />
              </a>
              <a
                href="https://www.eea.europa.eu/"
                title="European Environment Agency"
              >
                <LazyLoadImage
                  className="footerLogo"
                  // height={80}
                  effect="blur"
                  src={eeaLogo}
                  alt="European Environment Agency"
                  title="European Environment Agency"
                  // alt={intl.formatMessage(messages.plonesite)}
                  // title={intl.formatMessage(messages.plonesite)}
                  width={'100%'}
                  visibleByDefault={true}
                  placeholder={
                    <Placeholder>
                      <Placeholder.Image rectangular />
                    </Placeholder>
                  }
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </Segment>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Footer.propTypes = {
  /**
   * i18n object
   */
};

export default injectIntl(Footer);
