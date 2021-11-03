/**
 * @module components/theme/Forbidden/Forbidden
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Container } from 'semantic-ui-react';
import { withServerErrorCode } from '@plone/volto/helpers/Utils/Utils';
import { Portal } from 'react-portal';

/**
 * forbidden function.
 * @function Forbidden
 * @returns {string} Markup of the forbidden page.
 */
const Forbidden = () => (
  <Container className="view-wrapper">
    <h1>
      <FormattedMessage id="Forbidden" defaultMessage="Forbidden" />
    </h1>
    <p className="description">
      <FormattedMessage
        id="We apologize for the inconvenience, but you don't have permissions on this resource."
        defaultMessage="We apologize for the inconvenience, but you don't have permissions on this resource."
      />
    </p>
    <p>
      If you are certain you have the correct web address but are encountering
      an error, please contact the{' '}
      <a href="mailto:info@eea.europa.eu">Site Administration</a>.
    </p>
    <p>
      Or go back to <a href="/">Homepage</a>.
    </p>
    <p>Thank you.</p>
    {__CLIENT__ &&
      document.querySelector('.header-image-wrapper .header-image-content') && (
        <Portal
          node={
            __CLIENT__ &&
            document.querySelector(
              '.header-image-wrapper .header-image-content',
            )
          }
        >
          <h1 style={{ color: 'white' }}>Forbidden</h1>
        </Portal>
      )}
  </Container>
);

export default withServerErrorCode(403)(Forbidden);
