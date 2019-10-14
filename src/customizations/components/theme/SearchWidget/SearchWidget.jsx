/**
 * Search widget component.
 * @module components/theme/SearchWidget/SearchWidget
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input } from 'semantic-ui-react';
import { compose } from 'redux';
import { PropTypes } from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { Popup } from 'semantic-ui-react'
import { Icon } from '@plone/volto/components';
import zoomSVG from '@plone/volto/icons/zoom.svg';
import Person from './person.svg';
import { connect } from 'react-redux';

const messages = defineMessages({
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
  searchSite: {
    id: 'Search Site',
    defaultMessage: 'Search Site',
  },
});

/**
 * SearchWidget component class.
 * @class SearchWidget
 * @extends Component
 */
class SearchWidget extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    token: PropTypes.string,
    pathname: PropTypes.string.isRequired,
  };
  static defaultProps = {
    token: null,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeSection = this.onChangeSection.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showSearch = this.showSearch.bind(this);
    this.handleClickOutsideSearch = this.handleClickOutsideSearch.bind(this);
    this.state = {
      text: '',
      section: false,
      showSearchField: false,
    };
  }

  /**
   * On change text
   * @method onChangeText
   * @param {object} event Event object.
   * @param {string} value Text value.
   * @returns {undefined}
   */
  onChangeText(event, { value }) {
    this.setState({
      text: value,
    });
  }

  /**
   * On change section
   * @method onChangeSection
   * @param {object} event Event object.
   * @param {bool} checked Section checked.
   * @returns {undefined}
   */
  onChangeSection(event, { checked }) {
    this.setState({
      section: checked,
    });
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {event} event Event object.
   * @returns {undefined}
   */
  onSubmit(event) {
    const section = this.state.section ? `&path=${this.props.pathname}` : '';
    this.props.history.push(
      `/search?SearchableText=${this.state.text}${section}`,
    );
    event.preventDefault();
  }

  showSearch() {
    this.setState({ showSearchField: true });
  }
  componentDidMount() {
    document.body.addEventListener('click', this.handleClickOutsideSearch);
  }
  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleClickOutsideSearch);
  }
  handleClickOutsideSearch(e) {
    if (
      this.state.showSearchField === false ||
      document.querySelector('input[name="SearchableText"]').value
    )
      return;
    const selectors = [
      '.searchInput',
      'input[name="SearchableText"]',
      '.searchbox',
      '.searchIcon',
      '.searchIcon svg.icon',
    ];
    let matchedSelector;
    for (let selector of selectors) {
      if (e.target.matches(selector)) {
        matchedSelector = selector;
      }
    }
    if (!matchedSelector) {
      this.setState({ showSearchField: false });
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Form action="/search" onSubmit={this.onSubmit}>
        <Form.Field className="searchbox">
          <Input
            className={
              'searchInput' + (this.state.showSearchField ? ' show' : ' hidden')
            }
            aria-label={this.props.intl.formatMessage(messages.search)}
            onChange={this.onChangeText}
            name="SearchableText"
            value={this.state.text}
            transparent
            placeholder={this.props.intl.formatMessage(messages.searchSite)}
            title={this.props.intl.formatMessage(messages.search)}
          />
          <button
            className="searchIcon ui small basic no-border icon button"
            aria-label={this.props.intl.formatMessage(messages.search)}
          >
            <Icon name={zoomSVG} size="18px" />
          </button>
          {!this.state.showSearchField ? (
             <Popup content='Search' trigger={<button
              onClick={this.showSearch}
              className="overSearchIcon ui small basic no-border icon button"
              aria-label={this.props.intl.formatMessage(messages.search)}
            >
              <Icon name={zoomSVG} size="18px" />
            </button>} />
          ) : (
            ''
          )}
          {this.props.token && (
            <Popup content='Account actions' trigger={<img
              onClick={() => document.querySelector('.toolbar .user').click()}
              className="accountIcon insearch"
              style={{ marginLeft: '1.5rem', cursor: 'pointer' }}
              src={Person}
              alt=""
            />} />
          )}
        </Form.Field>
      </Form>
    );
  }
}

export default compose(
  connect(state => ({
    token: state.userSession.token,
  })),
  withRouter,
  injectIntl,
)(SearchWidget);
