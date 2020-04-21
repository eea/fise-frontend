
import React, { Component } from 'react';
import { Portal } from 'react-portal';
import { Route } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
/**
 * @export
 * @class Forbidden
 * @extends {Component}
 */
class Forbidden extends Component {
    /**
     * Render method.
     * @method render
     * @returns {string} Markup for the component.
     */
    render() {
        return (
            <Route render={({ staticContext }) => {
                if (staticContext) staticContext.status = 403;
                else staticContext = { status: 403 };
                return (
                    <div className="ui container view-wrapper">
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
                            If you are certain you have the correct web address but are encountering an error, please contact the{" "}
                            <a href="mailto:info@eea.europa.eu">
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
                                    <h1 style={{ color: "white" }}>Forbidden</h1>
                                </Portal>
                            )}
                    </div>
                );
            }}></Route>
        );
    }
}

export default Forbidden;