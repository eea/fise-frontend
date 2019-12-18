
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { asyncConnect } from 'redux-connect';
import { Link } from 'react-router-dom'

import { getBaseUrl } from '@plone/volto/helpers';
import {
    getNavigation,
} from '@plone/volto/actions';

/**
 * @export
 * @class SiteMap
 * @extends {Component}
 */
class SiteMap extends Component {
    /**
     * Property types.
     * @property {Object} propTypes Property types.
     * @static
     */
    static propTypes = {
        pathname: PropTypes.string.isRequired,
    };

    /**
     * Render method.
     * @method render
     * @returns {string} Markup for the component.
     */
    render() {
        const { navigation } = this.props;

        const TreeMap = ({ data }) => {
            return (
                <ul>
                    {data.map((m, i) => {
                        return (
                            <li key={i}>
                                <Link to="/">
                                    {m.title}
                                </Link>
                                {m.items && !!m.items.length && <TreeMap data={m.items} />}
                            </li>
                        );
                    })}
                </ul>
            );
        };

        return (
            <Fragment>
                <TreeMap data={navigation.items} />
            </Fragment>
        );
    }
}

export const __test__ = connect(
    (state, props) => ({
        pathname: props.location.pathname,
        content: state.content.data,
    }),
    {},
)(SiteMap);

export default compose(
    asyncConnect([

        {
            key: 'navigation',
            promise: ({ location, store: { dispatch } }) =>
                dispatch(getNavigation(getBaseUrl(location.pathname), 9999)),
        },

    ]),
    connect((state, props) => ({ pathname: props.location.pathname }), {}),
)(SiteMap);