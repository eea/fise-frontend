/**
 * View image tile.
 * @module components/manage/Tiles/Hero/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { flattenToAppURL } from '@plone/volto/helpers';

/**
 * View image tile class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => (
  <div className={'imageAndRichText ' + data.position}>
    <div className="tile-inner-wrapper">
      <img
        src={`${flattenToAppURL(data.url)}/@@images/image`}
        alt=""
        className="card-image"
      />
      <div className="card-body">
        <h1>{data.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.description }} />
      </div>
    </div>
  </div>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
