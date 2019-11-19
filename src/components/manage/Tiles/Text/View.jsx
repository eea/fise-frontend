/**
 * View text block.
 * @module components/manage/Blocks/Text/View
 */

import PropTypes from 'prop-types';
import React from 'react';
import redraft from 'redraft';
import { settings } from '~/config';

/**
 * View text block class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => {
  let text = data.cktext;
  let result;

  if (typeof text === 'string') {
    // TODO: need better regexp here
    text = text.replace(/(<? *script)/gi, 'illegalscript');
    result = (
      <div
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      />
    );
  } else {
    result = redraft(text, settings.ToHTMLRenderers, settings.ToHTMLOptions);
  }
  return text ? result : '';
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
