/**
 * View map block.
 * @module components/manage/Blocks/Maps/View
 */

import React, { useState } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import cx from 'classnames';
import VisibilitySensor from 'react-visibility-sensor';
import { Placeholder } from 'semantic-ui-react';
import PrivacyProtection from 'volto-embed/PrivacyProtection';

const messages = defineMessages({
  EmbededGoogleMaps: {
    id: 'Embeded Google Maps',
    defaultMessage: 'Embeded Google Maps',
  },
});

/**
 * View image block class.
 * @class View
 * @extends Component
 */

const View = ({ data, intl }) => {
  const [visible, setVisibility] = useState(false);
  console.log('map', data);
  // partialVisibility={true}
  return (
    <div
      className={cx(
        'block maps align',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
      style={
        data.align === 'full' ? { position: 'static', height: '45vh' } : {}
      }
    >
      <div
        className={cx({
          'full-width-block': data.align === 'full',
        })}
        style={{ height: '100%' }}
      >
        <VisibilitySensor
          onChange={isVisible => {
            !visible && isVisible && setVisibility(true);
          }}
          partialVisibility={true}
          offset={{ bottom: 200 }}
        >
          <PrivacyProtection style={{ height: '100%' }} data={data}>
            {visible ? (
              <iframe
                title={intl.formatMessage(messages.EmbededGoogleMaps)}
                src={data.url}
                className="google-map"
                frameBorder="0"
                allowFullScreen
                style={{ height: '45vh' }}
              />
            ) : (
              <Placeholder style={{ height: '100%', width: '100%' }}>
                <Placeholder.Image rectangular />
              </Placeholder>
            )}
          </PrivacyProtection>
        </VisibilitySensor>
      </div>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default injectIntl(View);
