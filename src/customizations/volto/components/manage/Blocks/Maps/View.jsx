/**
 * View map block.
 * @module components/manage/Blocks/Maps/View
 */

import React, { useState } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import cx from 'classnames';
import VisibilitySensor from 'react-visibility-sensor';

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
  return (
    <VisibilitySensor partialVisibility={true} onChange={setVisibility}>
      <p
        className={cx(
          'block maps align',
          {
            center: !Boolean(data.align),
          },
          data.align,
        )}
      >
        <div
          className={cx('video-inner', {
            'full-width': data.align === 'full',
          })}
        >
          {visible ? (
            <iframe
              title={intl.formatMessage(messages.EmbededGoogleMaps)}
              src={data.url}
              className="google-map"
              frameBorder="0"
              allowFullScreen
              style={{ height: '100%' }}
            />
          ) : (
            ''
          )}
        </div>
      </p>
    </VisibilitySensor>
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
