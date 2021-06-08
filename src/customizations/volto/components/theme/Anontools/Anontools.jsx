/**
 * Anontools component.
 * @module components/theme/Anontools/Anontools
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Icon } from '@plone/volto/components';
import { getBaseUrl } from '@plone/volto/helpers';

import config from '@plone/volto/registry';
import user from '@plone/volto/icons/user.svg';

// import { List, Popup } from 'semantic-ui-react';

/**
 * Anontools container class.
 * @class Anontools
 * @extends Component
 */
class Anontools extends Component {
  static propTypes = {
    token: PropTypes.string,
    content: PropTypes.shape({
      '@id': PropTypes.string,
    }),
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
    content: {
      '@id': null,
    },
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      !this.props.token && (
        <li className="item footer-login">
          <Icon name={user} size="20px" />
          <Link
            style={{ marginLeft: '.5rem' }}
            to={`/login${
              this.props.content
                ? `?return_url=${getBaseUrl(this.props.content['@id'])
                    .replace(config.settings.apiPath, '')
                    .replace(config.settings.internalApiPath, '')}`
                : ''
            }`}
          >
            <FormattedMessage id="Log in" defaultMessage="Log in" />
          </Link>
        </li>
      )
    );
  }
}

export default connect((state, props) => {
  const path = state.router.location?.pathname;
  return {
    token: state.userSession.token,
    content: state.prefetch?.[path] || state.content.data,
  };
})(Anontools);
