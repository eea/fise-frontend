/**
 * Search component.
 * @module components/theme/Search/Search
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import { asyncConnect } from 'redux-connect';
import { FormattedMessage } from 'react-intl';
import { Portal } from 'react-portal';
import { Container, Tab, Dropdown, Button, Grid } from 'semantic-ui-react';
import qs from 'query-string';
import { BodyClass } from '@plone/volto/helpers';

import { searchContent } from '@plone/volto/actions';
import { setLoader, getKeywords, getCountry, doNfiSearch } from '~/actions';

import { SearchTags, Toolbar } from '@plone/volto/components';
import RenderSearch from '~/components/theme/Search/RenderSearch';

const toSearchOptions = (searchableText, subject, path) => {
  return {
    ...(searchableText && { SearchableText: searchableText }),
    ...(subject && {
      Subject: subject,
    }),
    ...(path && {
      path: path,
    }),
  };
};

const panes = context => {
  return [
  {
    menuItem: `Portal data (${context.items.length})`,
    render: () => {
      return (
        <div>
          <Grid>
            <Grid.Column width={8}>
              <RenderSearch items={context.items} pagination={context.pagination} />
            </Grid.Column>
            <Grid.Column width={4}>
              <h4>FILTERS</h4>
            </Grid.Column>
          </Grid>
        </div>
      );
    }
  },
  {
    menuItem: `National Forest Inventories (${context.nfiItems ? context.nfiItems.length : 0})`,
    render: () => {
      return (
        <Grid>
          <Grid.Column width={8}>
            <RenderSearch items={context.nfiItems ? context.nfiItems : []} pagination={context.pagination} />
          </Grid.Column>
          <Grid.Column width={4}>
            <h4>FILTERS</h4>
          </Grid.Column>
        </Grid>
      )
    }
  },
  { menuItem: 'Regional / International data' },
];
}

class Search extends Component {
  static propTypes = {
    searchContent: PropTypes.func.isRequired,
    setLoader: PropTypes.func.isRequired,
    getKeywords: PropTypes.func.isRequired,
    getCountry: PropTypes.func.isRequired,
    doNfiSearch: PropTypes.func.isRequired,
    searchableText: PropTypes.string,
    subject: PropTypes.string,
    path: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        '@type': PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    ),
    pathname: PropTypes.string.isRequired
  };

  static defaultProps = {
    items: [],
    loading: false,
    searchableText: null,
    subject: null,
    path: null,
  };

  state = {
    dataReady: false,
    activeTab: 0,
    selectedKeywords: [],
    keywords: [],
    pagination: {
      page: 1,
      selectedItemsPerPage: 5,
      totalItems: 0,
      itemsPerPage: [5, 10, 25]
    }
  };
  /**
   * Component will mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.initiateKeywords();
    /**
     * When url hastag is changed empty selectedKeywords and add the new hastag
     */
    window.addEventListener('hashchange', (e) => {
      this.setState({
        selectedKeywords: []
      })
      this.addHashTagAndDoNfiSearch(e, true)
    }, false);
    this.doSearch(
      this.props.searchableText,
      this.props.subject,
      this.props.path,
    );
  }
  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps = nextProps => {
    if (
      nextProps.searchableText !== this.props.searchableText ||
      nextProps.subject !== this.props.subject
    ) {
      this.doSearch(
        nextProps.searchableText,
        nextProps.subject,
        this.props.path,
      );
    }
  };

  /**
   * Search based on the given searchableText, subject and path.
   * @method doSearch
   * @param {string} searchableText The searchable text string
   * @param {string} subject The subject (tag)
   * @param {string} path The path to restrict the search to
   * @returns {undefined}
   */

  doSearch = (searchableText, subject, path) => {
    this.props.searchContent(
      '',
      toSearchOptions(searchableText, subject, path),
    );
  };

  initiateKeywords = () => {
    const hash = window.location.hash;
    this.props.getKeywords()
      .then(() => {
        let keywords = [...this.props.originalKeywords];
        this.setState({ keywords });
        this.addHashTagAndDoNfiSearch(hash, false)
      })
  }

  addHashTagAndDoNfiSearch = (hash, isEvent) => {
    if (isEvent) {
      const newHashArr = hash.newURL.split('#');
      const newHash = newHashArr[newHashArr.length - 1];
      this.addTag(newHash);
      this.handleNfiSearch();
      return;
    }
    if (!hash.length) return this.handleNfiSearch();
    this.addTag(hash.slice(1));
    this.handleNfiSearch();
  }

  addTag = (newTag) => {
    const tag = {
      key: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000)),
      text: newTag,
      value: newTag
    };
    let isNew = true;
    let keywords = [...this.state.keywords];
    keywords.forEach(keyword => {
      if (keyword.value === tag.value) {
        isNew = false;
      }
    })
    if (isNew) {
      keywords.push(tag);
      this.setState({ keywords });
    }

    let selectedKeywords = [...this.state.selectedKeywords];
    selectedKeywords.push(tag.value);
    this.setState({ selectedKeywords });
  }

  handleChange = (event, { value }) => {
    if (value.length > this.state.selectedKeywords.length) {
      value.forEach(val => {
        const index = this.state.selectedKeywords.indexOf(val)
        if (index === -1) {
          this.addTag(val)
        }
      })
    } else {
      this.state.selectedKeywords.forEach(keyword => {
        const index = value.indexOf(keyword)
        if (index === -1) {
          let selectedKeywords = [...this.state.selectedKeywords];
          selectedKeywords.splice(selectedKeywords.indexOf(keyword), 1);
          this.setState({ selectedKeywords });
        }
      })
    }
  }

  handleNfiSearch = (page = null, pageSize = null) => {
    this.props.setLoader(true)
    let keywords = [];
    let searchTerms = [];
    let originalKeywords = this.props.originalKeywords.map(keyword => keyword.value);
    this.state.selectedKeywords.forEach(selectedKeyword => {
      const index = originalKeywords.indexOf(selectedKeyword);
      if (index !== -1) {
        keywords.push(selectedKeyword);
      } else {
        searchTerms.push(selectedKeyword);
      }
    })
    if (!page) page = this.state.pagination.page;
    if (!pageSize) pageSize = this.state.pagination.selectedItemsPerPage
    this.props.doNfiSearch(page, pageSize, searchTerms, keywords)
      .then(() => {
        if (!this.state.dataReady) {
          this.setState({ dataReady: true })
        }
        this.props.setLoader(false)
        this.updateTotalItems(this.props.nfiSearch.count)
      })
  }

  handleTabChange = (event, data) => {
    this.setState({
      activeTab: data.activeIndex
    })
  }

  updateItemsPerPage = (event) => {
    let pagination = {...this.state.pagination};
    pagination.selectedItemsPerPage = event.target.value;
    this.setState({ pagination });
    this.handleNfiSearch(pagination.page, pagination.selectedItemsPerPage);
  }

  updatePage = (event, data) => {
    let pagination = {...this.state.pagination};
    pagination.page = data.activePage;
    this.setState({ pagination })
    this.handleNfiSearch(pagination.page, pagination.selectedItemsPerPage);
  }

  updateTotalItems = (count) => {
    let pagination = {...this.state.pagination};
    pagination.totalItems = count;
    this.setState({ pagination });
  }

  render() {
    const context = {
      term: this.props.searchableText,
      items: this.props.items,
      nfiItems: this.props.nfiSearch.results,
      nfiSearch: this.props.nfiSearch,
      pagination: this.state.activeTab === 1 ? {...this.state.pagination, updateItemsPerPage: this.updateItemsPerPage, updatePage: this.updatePage} : null
    };
    const loader = (<h1>Loading data...</h1>)
    const multiselect = this.state.activeTab === 1 ? 
    (
      <div className="multiselect-container">
        <Dropdown 
          placeholder='Type...' 
          fluid multiple selection search allowAdditions
          options={this.state.keywords}
          value={this.state.selectedKeywords}
          onChange={this.handleChange}
          loading
        />
        <Button 
          className="search-button darkOrange"
          onClick={() => this.handleNfiSearch()}
        >Search</Button>
      </div>
    ) : ''
    const ui = (
      <Container id="page-search">
        <Helmet title="Search" />
        <div className="container">
          <BodyClass className="search-container" />
          {multiselect}
          <Tab
            activeIndex={this.state.activeTab}
            menu={{
              compact: true,
              attached: false,
              tabular: false,
            }}
            panes={panes(context)}
            onTabChange={this.handleTabChange}
          />
        </div>
        <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
          <Toolbar
            pathname={this.props.pathname}
            hideDefaultViewButtons
            inner={<span />}
          />
        </Portal>
      </Container>
    );
    if (!this.state.dataReady) return loader
    return ui
  }
}

export const __test__ = connect(
  (state, props) => ({
    items: state.search.items,
    searchableText: qs.parse(props.location.search).SearchableText,
    subject: qs.parse(props.location.search).Subject,
    path: qs.parse(props.location.search).path,
    pathname: props.location.pathname,
  }),
  { searchContent },
)(Search);

export default compose(
  connect(
    (state, props) => ({
      items: state.search.items,
      searchableText: qs.parse(props.location.search).SearchableText,
      subject: qs.parse(props.location.search).Subject,
      path: qs.parse(props.location.search).path,
      pathname: props.location.pathname,
      originalKeywords: state.nfiFacets.keywords.map(keyword => ({ key: keyword.id, id: keyword.id, text: keyword.name, value: keyword.name })),
      nfiSearch: state.nfiFacets.search
    }),
    { searchContent, setLoader, getKeywords, getCountry, doNfiSearch },
  ),
  asyncConnect([
    {
      key: 'search',
      promise: ({ location, store: { dispatch } }) =>
        dispatch(
          searchContent(
            '',
            toSearchOptions(
              qs.parse(location.search).SearchableText,
              qs.parse(location.search).Subject,
              qs.parse(location.search).path,
            ),
          ),
        )
    }
  ]),
)(Search);
