
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Portal } from 'react-portal';


/**
 * @export
 * @class Unauthorized
 * @extends {Component}
 */
class Unauthorized extends Component {
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

        return (
            <div style={{ display: 'flex', flexDirection: "column", alignContent: 'center' }} className="ui container view-wrapper">
                <p className="description">
                Access is denied due to invalid credentials
                    </p>
                <p>
                    If you are certain you have the correct web address but are encountering an error, please contact the{" "}
                    <a href="contact-form">
                        Site Administration
                    </a>
                    .
                </p>
                <p>
                    Or go back to {" "}
                    <a href="/">
                        Homepage
                    </a>
                    .
                </p>
                <p>
                    Thank you.
                </p>
                {__CLIENT__ &&
                    document.querySelector(
                        '.header-image-wrapper .header-image-content',
                    ) && (
                        <Portal
                            node={
                                __CLIENT__ &&
                                document.querySelector(
                                    '.header-image-wrapper .header-image-content',
                                )
                            }
                        >
                            <h2 style={{ color: "white" }}>Unauthorized</h2>
                        </Portal>
                    )}
            </div>
        );
    }
}

export const __test__ = connect(
    (state, props) => ({
        pathname: props.location.pathname,
        content: state.content.data,
    }),
    {},
)(Unauthorized);

export default Unauthorized;