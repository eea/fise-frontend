/**
 * View image block.
 * @module components/manage/Blocks/Image/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { settings } from '~/config';

import { flattenToAppURL } from '@plone/volto/helpers';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
const View = ({ data, detached }) => {

  const imgWidth = () => {
    if (data.align === "full") { return "100%" }
    if (data.width) { return data.width + "px" } else { return 'auto' }
  }

  return (
    <React.Fragment>

      {data.url && (
        <>
          {(() => {
            const image = (
              <img
                className={cx('block image align',
                  {
                    center: !Boolean(data.align),
                    detached,
                  },
                  data.align,
                )}
                style={{
                  width: imgWidth(),
                  height: data.height ? data.height + 'px' : 'auto',
                  display: "block",
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  float: data.align === 'center' ? 'none' : data.align,
                }}
                src={
                  data.url.includes(settings.apiPath)
                    ? `${flattenToAppURL(data.url)}/@@images/image`
                    : data.url
                }
                alt={data.alt || ''}
              />
            );
            if (data.href) {
              if (
                (data.href.startsWith('http') || data.href.startsWith('https')) &&
                !data.href.includes(settings.apiPath)
              ) {
                return (
                  <a
                    target={data.openLinkInNewTab ? '_blank' : null}
                    href={data.href}
                  >
                    {image}
                  </a>
                );
              } else {
                return (
                  <Link
                    to={data.href.replace(settings.apiPath, '')}
                    target={data.openLinkInNewTab ? '_blank' : null}
                  >
                    {image}
                  </Link>
                );
              }
            } else {
              return image;
            }
          })()}
        </>
      )}
    </React.Fragment>

  )
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
