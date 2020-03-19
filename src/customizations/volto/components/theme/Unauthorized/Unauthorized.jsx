
import React, { Component, Fragment } from 'react';
import { Portal } from 'react-portal';
import { Route } from "react-router-dom";
/**
 * @export
 * @class Unauthorized
 * @extends {Component}
 */
class Unauthorized extends Component {
    /**
     * Render method.
     * @method render
     * @returns {string} Markup for the component.
     */
    render() {
        return (
            <Route render={({ staticContext }) => {
                if (staticContext) staticContext.status = 401;
                else staticContext = { status: 401 };
                return (
                    <div className="ui container view-wrapper">
                        <p className="description">
                            You are trying to access a protected resource, please
                        <a href="/login">
                                {" "}login{" "}
                            </a>
                            first.
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
                                    <h1 style={{ color: "white" }}>Unauthorized</h1>
                                </Portal>
                            )}
                    </div>
                );
            }}></Route>
        );
    }
}

export default Unauthorized;