/**
 * Customized View to include Header image and Portlets
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Portal } from 'react-portal';
import { injectIntl } from 'react-intl';
import qs from 'query-string';
import { Dimmer, Loader } from 'semantic-ui-react';
import {trackEvent} from '@eeacms/volto-matomo/utils'

import {
  ContentMetadataTags,
  Comments,
  Tags,
  Toolbar,
  Icon,
} from '@plone/volto/components';
import { listActions, getContent } from '@plone/volto/actions';
import {
  BodyClass,
  getBaseUrl,
  getLayoutFieldname,
} from '@plone/volto/helpers';

import config from '@plone/volto/registry';

import printer from '@plone/volto/icons/printer.svg';

/**
 * View container class.
 * @class View
 * @extends Component
 */
class View extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    actions: PropTypes.shape({
      object: PropTypes.arrayOf(PropTypes.object),
      object_buttons: PropTypes.arrayOf(PropTypes.object),
      user: PropTypes.arrayOf(PropTypes.object),
    }),
    listActions: PropTypes.func.isRequired,
    /**
     * Action to get the content
     */
    getContent: PropTypes.func.isRequired,
    /**
     * Pathname of the object
     */
    pathname: PropTypes.string.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
      pathname: PropTypes.string,
    }).isRequired,
    /**
     * Version id of the object
     */
    versionId: PropTypes.string,
    /**
     * Content of the object
     */
    content: PropTypes.shape({
      /**
       * Layout of the object
       */
      layout: PropTypes.string,
      /**
       * Allow discussion of the object
       */
      allow_discussion: PropTypes.bool,
      /**
       * Title of the object
       */
      title: PropTypes.string,
      /**
       * Description of the object
       */
      description: PropTypes.string,
      /**
       * Type of the object
       */
      '@type': PropTypes.string,
      /**
       * Subjects of the object
       */
      subjects: PropTypes.arrayOf(PropTypes.string),
      is_folderish: PropTypes.bool,
    }),
    error: PropTypes.shape({
      /**
       * Error type
       */
      status: PropTypes.number,
    }),
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    actions: null,
    content: null,
    versionId: null,
    error: null,
  };

  state = {
    hasObjectButtons: null,
    isClient: false,
  };

  componentDidMount() {
    this.props.listActions(getBaseUrl(this.props.pathname));
    this.props.getContent(
      getBaseUrl(this.props.pathname),
      this.props.versionId,
    );
    this.setState({ isClient: true });
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.listActions(getBaseUrl(nextProps.pathname));
      this.props.getContent(
        getBaseUrl(nextProps.pathname),
        this.props.versionId,
      );
    }

    if (nextProps.actions.object_buttons) {
      const objectButtons = nextProps.actions.object_buttons;
      this.setState({
        hasObjectButtons: !!objectButtons.length,
      });
    }
  }

  /**
   * Default fallback view
   * @method getViewDefault
   * @returns {string} Markup for component.
   */
  getViewDefault = () => config.views.defaultView;

  /**
   * Get view by content type
   * @method getViewByType
   * @returns {string} Markup for component.
   */
  getViewByType = () =>
    config.views.contentTypesViews[this.props.content['@type']] || null;

  /**
   * Get view by content layout property
   * @method getViewByLayout
   * @returns {string} Markup for component.
   */
  getViewByLayout = () =>
    config.views.layoutViews[
      this.props.content[getLayoutFieldname(this.props.content)]
    ] || null;

  /**
   * Cleans the component displayName (specially for connected components)
   * which have the Connect(componentDisplayName)
   * @method cleanViewName
   * @param  {string} dirtyDisplayName The displayName
   * @returns {string} Clean displayName (no Connect(...)).
   */
  cleanViewName = (dirtyDisplayName) =>
    dirtyDisplayName
      .replace('Connect(', '')
      .replace('injectIntl(', '')
      .replace(')', '')
      .replace('connect(', '')
      .toLowerCase();

  sortHtmlCollectionByPosition = (collection, patterns) => {
    const first = []; //  ~follow the pattern
    const seccond = []; //   follow the pattern
    if (collection && !collection.classList.contains('__sorted')) {
      Array.prototype.forEach.call(collection.children, (child) => {
        patterns.forEach((pattern) => {
          if (
            pattern.requirement === 'has' &&
            child.classList.contains(pattern.class)
          ) {
            seccond.push({
              item: child,
              offsetTop: child.offsetTop,
              offsetHeight: child.offsetHeight,
            });
          } else first.push(child);
        });
      });
      seccond.sort((a, b) => a.offsetTop - b.offsetTop);
      for (let i = 0; i < seccond.length - 1; i++) {
        for (let j = 0; j < seccond.length - 1 - i; j++) {
          if (
            seccond[j].offsetHeight > seccond[j + 1].offsetTop &&
            seccond[j].offsetTop < seccond[j + 1].offsetTop
          ) {
            let tmp = seccond[j];
            seccond[j] = seccond[j + 1];
            seccond[j + 1] = tmp;
          }
        }
      }
      collection.innerHTML = '';
      first.forEach((item) => {
        collection.appendChild(item);
      });
      seccond.forEach((data) => {
        collection.appendChild(data.item);
      });
      collection.classList.add('__sorted');
      return true;
    }
    return false;
  };

  printDocument = () => {
    // const mosaicView = document.querySelector(
    //   '#mosaic-view .mosaic_view .react-grid-layout',
    // );
    // this.sortHtmlCollectionByPosition(mosaicView, [
    //   { class: 'react-grid-item', requirement: 'has' },
    // ]);
    trackEvent({
      category: 'Print',
      action: 'Click',
      name: document.title
    });
    document.getElementById('main').classList.add('print');
    setTimeout(() => {
      window.print();
    }, 1000);
    window.onafterprint = () =>
      document.getElementById('main').classList.remove('print');
  };
  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { views } = config;
    if (this.props.error && !this.props.connectionRefused) {
      let FoundView;
      if (this.props.error.status === undefined) {
        // For some reason, while development and if CORS is in place and the
        // requested resource is 404, it returns undefined as status, then the
        // next statement will fail
        FoundView = views.errorViews.corsError;
      } else {
        FoundView = views.errorViews[this.props.error.status.toString()];
      }
      if (!FoundView) {
        FoundView = views.errorViews['404']; // default to 404
      }
      return (
        <div id="view">
          <FoundView {...this.props} />
        </div>
      );
    }
    if (!this.props.content) {
      return <span />;
    }
    const RenderedView =
      this.getViewByType() || this.getViewByLayout() || this.getViewDefault();

    return (
      <div id="view">
        <ContentMetadataTags content={this.props.content} />
        {/* Body class if displayName in component is set */}
        <BodyClass
          className={
            RenderedView.displayName
              ? `view-${this.cleanViewName(RenderedView.displayName)}`
              : null
          }
        />
        {this.props.loading && (
          <Dimmer active inverted>
            <Loader size="massive" />
          </Dimmer>
        )}

        <RenderedView
          content={this.props.content}
          location={this.props.location}
          token={this.props.token}
          history={this.props.history}
        />
        <div className="print-button">
          <Icon onClick={this.printDocument} name={printer} size="32px" />
        </div>

        {this.props.content.subjects &&
          this.props.content.subjects.length > 0 && (
            <Tags tags={this.props.content.subjects} />
          )}
        {/* Add opt-in social sharing if required, disabled by default */}
        {/* In the future this might be parameterized from the app config */}
        {/* <SocialSharing
          url={typeof window === 'undefined' ? '' : window.location.href}
          title={this.props.content.title}
          description={this.props.content.description || ''}
        /> */}
        {this.props.content.allow_discussion && (
          <Comments pathname={this.props.pathname} />
        )}
        {this.state.isClient && (
          <Portal node={document.getElementById('toolbar')}>
            <Toolbar pathname={this.props.pathname} inner={<span />} />
          </Portal>
        )}

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
              <h1>{this.props.content.title}</h1>
              <p>{this.props.content.description}</p>
            </Portal>
          )}
      </div>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      actions: state.actions.actions,
      token: state.userSession.token,
      content: state.content.data,
      error: state.content.get.error,
      apiError: state.apierror.error,
      connectionRefused: state.apierror.connectionRefused,
      pathname: props.location.pathname,
      loading: state.content.get?.loading,
      versionId:
        qs.parse(props.location.search) &&
        qs.parse(props.location.search).version,
    }),
    {
      listActions,
      getContent,
    },
  ),
)(View);
