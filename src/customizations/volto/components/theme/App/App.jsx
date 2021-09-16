/**
 * App container.
 * @module components/theme/App/App
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { asyncConnect } from '@plone/volto/helpers';
import { Segment, Container } from 'semantic-ui-react';
import { renderRoutes } from 'react-router-config';
import { Slide, ToastContainer, toast } from 'react-toastify';
import split from 'lodash/split';
import join from 'lodash/join';
import trim from 'lodash/trim';
import cx from 'classnames';
import config from '@plone/volto/registry';
import { PluggablesProvider } from '@plone/volto/components/manage/Pluggable';

import Error from '@plone/volto/error';

import ViewletsRenderer from '@eeacms/volto-addons-forest/Viewlets/Render';

import {
  Footer,
  Header,
  Icon,
  OutdatedBrowser,
  AppExtras,
  SkipLinks,
  Messages,
} from '@plone/volto/components';
import { BodyClass, getBaseUrl, getView, isCmsUi } from '@plone/volto/helpers';
import {
  getContent,
  getNavigation,
  getTypes,
  getWorkflow,
  purgeMessages,
} from '@plone/volto/actions';
import { getFrontpageSlides, getDefaultHeaderImage } from '~/actions';
import { getPortlets } from '@eeacms/volto-addons-forest/actions';

import clearSVG from '@plone/volto/icons/clear.svg';
import * as Sentry from '@sentry/browser';

/**
 * @export
 * @class App
 * @extends {Component}
 */
class App extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    purgeMessages: PropTypes.func.isRequired,
  };

  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  /**
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.purgeMessages();
      if (this.state.hasError) {
        this.setState({ hasError: false });
      }
    }
  }

  /**
   * ComponentDidCatch
   * @method ComponentDidCatch
   * @param {string} error  The error
   * @param {string} info The info
   * @returns {undefined}
   */
  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, errorInfo: info });
    if (__CLIENT__) {
      if (window?.env?.RAZZLE_SENTRY_DSN || __SENTRY__?.SENTRY_DSN) {
        Sentry.captureException(error);
      }
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { views } = config;
    const path = getBaseUrl(this.props.pathname);
    const action = getView(this.props.pathname);
    const isCmsUI = isCmsUi(this.props.pathname);
    const ConnectionRefusedView = views.errorViews.ECONNREFUSED;
    const headerImage =
      this.props.content?.image?.download || this.props.defaultHeaderImage;

    return (
      <PluggablesProvider>
        <BodyClass className={`view-${action}view`} />

        {/* Body class depending on content type */}
        {this.props.content && this.props.content['@type'] && (
          <BodyClass
            className={`contenttype-${this.props.content['@type']
              .replace(' ', '-')
              .toLowerCase()}`}
          />
        )}

        {/* Body class depending on sections */}
        <BodyClass
          className={cx({
            [trim(join(split(this.props.pathname, '/'), ' section-'))]:
              this.props.pathname !== '/',
            siteroot: this.props.pathname === '/',
            'is-authenticated': !!this.props.token,
            'is-anonymous': !this.props.token,
            'cms-ui': isCmsUI,
            'public-ui': !isCmsUI,
          })}
        />
        <SkipLinks />
        <Header
          actualPathName={this.props.pathname}
          pathname={path}
          defaultHeaderImage={headerImage}
          navigationItems={this.props.navigation}
          frontpage_slides={this.props.frontpage_slides}
        />
        <Segment basic className="content-area">
          <Container>
            <main>
              <OutdatedBrowser />
              <Messages />
              <div className="editor-toolbar-wrapper" />
              {this.props.connectionRefused ? (
                <ConnectionRefusedView />
              ) : this.state.hasError ? (
                <Error
                  message={this.state.error.message}
                  stackTrace={this.state.errorInfo.componentStack}
                />
              ) : (
                <>
                  {renderRoutes(this.props.route.routes, {
                    staticContext: this.props.staticContext,
                  })}
                  <ViewletsRenderer {...this.props} />
                </>
              )}
            </main>
          </Container>
        </Segment>
        <Footer />
        <ToastContainer
          position={toast.POSITION.BOTTOM_CENTER}
          hideProgressBar
          transition={Slide}
          autoClose={5000}
          closeButton={
            <Icon
              className="toast-dismiss-action"
              name={clearSVG}
              size="18px"
            />
          }
        />
        <AppExtras {...this.props} />
      </PluggablesProvider>
    );
  }
}

export const __test__ = connect(
  (state, props) => ({
    pathname: props.location.pathname,
    token: state.userSession.token,
    content: state.content.data,
    apiError: state.apierror.error,
    connectionRefused: state.apierror.connectionRefused,
  }),
  { purgeMessages },
)(App);

export default compose(
  asyncConnect([
    {
      key: 'content',
      promise: ({ location, store: { dispatch } }) =>
        __SERVER__ && dispatch(getContent(getBaseUrl(location.pathname))),
    },
    {
      key: 'frontpage_slides',
      promise: ({ store: { dispatch } }) =>
        __SERVER__ && dispatch(getFrontpageSlides()),
    },
    {
      key: 'defaultHeaderImage',
      promise: ({ store: { dispatch } }) =>
        __SERVER__ && dispatch(getDefaultHeaderImage()),
    },
    {
      key: 'navigation',
      promise: ({ location, store: { dispatch } }) =>
        __SERVER__ &&
        dispatch(
          getNavigation(
            getBaseUrl(location.pathname),
            config.settings.navDepth,
          ),
        ),
    },
    {
      key: 'types',
      promise: ({ location, store: { dispatch } }) =>
        __SERVER__ && dispatch(getTypes(getBaseUrl(location.pathname))),
    },
    {
      key: 'workflow',
      promise: ({ location, store: { dispatch } }) =>
        __SERVER__ && dispatch(getWorkflow(getBaseUrl(location.pathname))),
    },
    {
      key: 'portlets',
      promise: ({ location, store: { dispatch } }) =>
        __SERVER__ && dispatch(getPortlets(getBaseUrl(location.pathname))),
    },
    {
      key: 'portlets_left',
      promise: ({ location, store: { dispatch } }) =>
        __SERVER__ &&
        dispatch(
          getPortlets(getBaseUrl(location.pathname), 'plone.leftcolumn'),
        ),
    },
    {
      key: 'portlets_right',
      promise: ({ location, store: { dispatch } }) =>
        __SERVER__ &&
        dispatch(
          getPortlets(getBaseUrl(location.pathname), 'plone.rightcolumn'),
        ),
    },
    {
      key: 'portlets_footer',
      promise: ({ location, store: { dispatch } }) =>
        __SERVER__ &&
        dispatch(
          getPortlets(getBaseUrl(location.pathname), 'plone.footerportlets'),
        ),
    },
  ]),
  connect(
    (state, props) => ({
      pathname: props.location.pathname,
      token: state.userSession.token,
      content: state.content.data,
      apiError: state.apierror.error,
      connectionRefused: state.apierror.connectionRefused,
      defaultHeaderImage: state.default_header_image.items?.[0],
      frontpage_slides: state.frontpage_slides.items,
      navigation: state.navigation.items,
    }),
    { purgeMessages },
  ),
)(App);
