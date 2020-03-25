
import React, { Component, Fragment } from 'react';
import { Portal } from 'react-portal';
import { Route } from "react-router-dom";
/**
 * @export
 * @class NotFound
 * @extends {Component}
 */
class NotFound extends Component {
    /**
     * Render method.
     * @method render
     * @returns {string} Markup for the component.
     */
    render() {
        return (
            <Route render={({ staticContext }) => {
                if (staticContext) staticContext.status = 404;
                else staticContext = { status: 404 };
                return (
                    <div className="ui container view-wrapper">
                        <p className="description">
                            We apologize for the inconvenience, but the page you were trying to access is not at this address. You can use the links below to help you find what you are looking for.
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
                                    <h2 style={{ color: "white" }}>This page does not seem to exist…</h2>
                                </Portal>
                            )}
                    </div>
                );
            }}></Route>
        );
    }
}

export default NotFound;