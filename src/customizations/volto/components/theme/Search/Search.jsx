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
import { SearchTags, Toolbar } from '@plone/volto/components';
import RenderSearch from '~/components/theme/Search/RenderSearch';
import SearchFilters from '~/components/theme/Search/SearchFilters';

import { searchContent } from '@plone/volto/actions';
import {
  setLoader,
  getKeywords,
  doNfiSearch,
  getCountry,
  getNutsLevel,
  getPublicationYears,
  getColectionRange,
  getTopicCategory,
  getResourceType,
  getDataSet,
  getDataType,
} from '~/actions';

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
      menuItem: `Portal data (${context.portalData.items.length})`,
      render: () => {
        return (
          <RenderSearch
            data={context.portalData}
            pagination={context.pagination}
          />
        );
      },
    },
    {
      menuItem: `National Forest Inventories`,
      render: () => {
        return (
          <RenderSearch
            data={context.nfiData ? context.nfiData : {}}
            pagination={context.pagination}
          />
        );
      },
    },
    { menuItem: 'Regional / International data' },
  ];
};

const queryParams = {
  country: 'country',
  data_set: 'data_set',
  data_type: 'data_type',
  resource_type: 'resource_type',
  nuts_level: 'nuts_level',
  topic_category: 'topic_category',
  published_year: 'published_year',
  collections_range: 'collections_range',
  keyword: 'keyword',
  published_year_range: 'published_year__range',
  data_collection_end_year: 'data_collection_end_year',
  data_collection_start_year: 'data_collection_start_year',
  data_collection_start_year__lte: 'data_collection_start_year__lte',
  data_collection_end_year__gte: 'data_collection_end_year__gte',
};

class Search extends Component {
  static propTypes = {
    searchContent: PropTypes.func.isRequired,
    setLoader: PropTypes.func.isRequired,

    getKeywords: PropTypes.func.isRequired,
    getCountry: PropTypes.func.isRequired,
    getNutsLevel: PropTypes.func.isRequired,
    getPublicationYears: PropTypes.func.isRequired,
    getColectionRange: PropTypes.func.isRequired,
    getTopicCategory: PropTypes.func.isRequired,
    getResourceType: PropTypes.func.isRequired,
    getDataSet: PropTypes.func.isRequired,
    getDataType: PropTypes.func.isRequired,

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
    pathname: PropTypes.string.isRequired,
  };

  static defaultProps = {
    items: [],
    loading: false,
    searchableText: null,
    subject: null,
    path: null,
  };

  state = {
    dataReady: true,
    activeTab: 0,
    selectedKeywords: [],
    nfiSelectedCountry: '',
    nfiSelectedFilters: {},
    keywords: [],
    pagination: {
      page: 1,
      selectedItemsPerPage: 5,
      totalItems: 0,
      itemsPerPage: [5, 10, 25],
    },
    facets: {
      country: {
        entityName: queryParams.country,
        getFunction: this.props.getCountry,
        facetNames: [queryParams.country],
      },
      nuts_level: {
        entityName: queryParams.nuts_level,
        getFunction: this.props.getNutsLevel,
        facetNames: [queryParams.nuts_level],
      },
      published_year: {
        entityName: queryParams.published_year,
        getFunction: this.props.getPublicationYears,
        facetNames: [queryParams.published_year],
      },
      collections_range: {
        entityName: queryParams.collections_range,
        getFunction: this.props.getColectionRange,
        facetNames: [
          queryParams.data_collection_end_year,
          queryParams.data_collection_start_year,
        ],
      },
      topic_category: {
        entityName: queryParams.topic_category,
        getFunction: this.props.getTopicCategory,
        facetNames: [queryParams.topic_category],
      },
      resource_type: {
        entityName: queryParams.resource_type,
        getFunction: this.props.getResourceType,
        facetNames: [queryParams.resource_type],
      },
      data_set: {
        entityName: queryParams.data_set,
        getFunction: this.props.getDataSet,
        facetNames: [queryParams.data_set],
      },
      data_type: {
        entityName: queryParams.data_type,
        getFunction: this.props.getDataType,
        facetNames: [queryParams.data_type],
      },
    },
    facetsData: null,
  };
  /**
   * Component will mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.initiateKeywords().then(() => {
      if (
        Object.keys(this.props.nfiSearch).length === 0 ||
        typeof this.props.nfiSearch.results === 'undefined'
      ) {
        this.doNfiSearch().then(() => {
          this.makeFacets();
        });
      } else {
        this.makeFacets();
      }
    });
    /**
     * When url hastag is changed empty selectedKeywords and add the new hastag
     */
    window.addEventListener(
      'hashchange',
      e => {
        this.setState({
          selectedKeywords: [],
        });
        this.addHashTagAndDoNfiSearch(e, true);
      },
      false,
    );
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

  doNfiSearch = (page = null, pageSize = null, searchTerms = '', keywords = '', countries = '', customQuery = '') => {
    this.props.setLoader(true)
    return this.props.doNfiSearch(page, pageSize, searchTerms, keywords, countries, customQuery)
      .then(() => {
        if (!this.state.dataReady) {
          this.setState({ dataReady: true });
        }
        this.props.setLoader(false);
        this.updateTotalItems(this.props.nfiSearch.count);
      })
      .catch(error => {})
      .catch(error => console.log(error));
  };

  initiateKeywords = () => {
    return new Promise((resolve, reject) => {
      const hash = window.location.hash;
      this.props
        .getKeywords()
        .then(() => {
          let keywords = [...this.props.originalKeywords];
          this.setState({ keywords });
          resolve(this.addHashTagAndDoNfiSearch(hash, false));
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  initiateSelectedFilters = () => {
    let nfiSelectedFilters = {}
    Object.keys(this.state.facetsData).forEach(key => {
      nfiSelectedFilters[key] = ''
    })
    this.setState({ nfiSelectedFilters });
  }

  addHashTagAndDoNfiSearch = (hash, isEvent) => {
    if (isEvent) {
      const newHashArr = hash.newURL.split('#');
      const newHash = newHashArr[newHashArr.length - 1];
      this.addTag(newHash);
      return this.handleNfiSearch();
    }
    if (!hash.length) return;
    this.addTag(hash.slice(1));
    return this.handleNfiSearch();
  };

  addTag = newTag => {
    const tag = {
      key: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      text: newTag,
      value: newTag,
    };
    let isNew = true;
    let keywords = [...this.state.keywords];
    keywords.forEach(keyword => {
      if (keyword.value === tag.value) {
        isNew = false;
      }
    });
    if (isNew) {
      keywords.push(tag);
      this.setState({ keywords });
    }

    let selectedKeywords = [...this.state.selectedKeywords];
    selectedKeywords.push(tag.value);
    this.setState({ selectedKeywords });
  };

  handleChange = (event, { value }) => {
    if (value.length > this.state.selectedKeywords.length) {
      value.forEach(val => {
        const index = this.state.selectedKeywords.indexOf(val);
        if (index === -1) {
          this.addTag(val);
        }
      });
    } else {
      this.state.selectedKeywords.forEach(keyword => {
        const index = value.indexOf(keyword);
        if (index === -1) {
          let selectedKeywords = [...this.state.selectedKeywords];
          selectedKeywords.splice(selectedKeywords.indexOf(keyword), 1);
          this.setState({ selectedKeywords });
        }
      });
    }
  };

  handleNfiSearch = (page = null, pageSize = null) => {
    let keywords = [];
    let searchTerms = [];
    let countries = [];
    let customQuery = '';
    let originalKeywords = this.props.originalKeywords.map(keyword => keyword.value);

    if (this.state.activeTab === 1) {
      countries = this.state.nfiSelectedCountry
      Object.keys(this.state.nfiSelectedFilters).forEach(filter => { 
        customQuery += this.state.nfiSelectedFilters[filter]
      })
    }

    this.state.selectedKeywords.forEach(selectedKeyword => {
      const index = originalKeywords.indexOf(selectedKeyword);
      if (index !== -1) {
        keywords.push(selectedKeyword);
      } else {
        searchTerms.push(selectedKeyword);
      }
    });
    if (!page) page = this.state.pagination.page;
    if (!pageSize) pageSize = this.state.pagination.selectedItemsPerPage
    return this.doNfiSearch(page, pageSize, searchTerms, keywords, countries, customQuery)
  }

  handleTabChange = (event, data) => {
    this.setState({
      activeTab: data.activeIndex,
    });
  };

  updateItemsPerPage = event => {
    let pagination = { ...this.state.pagination };
    pagination.selectedItemsPerPage = event.target.value;
    this.setState({ pagination });
    this.handleNfiSearch(pagination.page, pagination.selectedItemsPerPage);
  };

  updatePage = (event, data) => {
    let pagination = { ...this.state.pagination };
    pagination.page = data.activePage;
    this.setState({ pagination });
    this.handleNfiSearch(pagination.page, pagination.selectedItemsPerPage);
  };

  updateTotalItems = count => {
    let pagination = { ...this.state.pagination };
    pagination.totalItems = count;
    this.setState({ pagination });
  };

  // NFI
  handleCountrySelected = (country) => {
    this.setState({
      nfiSelectedCountry: country
    }, this.handleNfiSearch)
  }
  
  handleFilterSelected = (data) => {
    const query = `&${data.name}=${data.value}` 
    let nfiSelectedFilters = {...this.state.nfiSelectedFilters};
    if (data.checked && !nfiSelectedFilters[data.name].includes(query)) {
      nfiSelectedFilters[data.name] += query;
    } else if(!data.checked && nfiSelectedFilters[data.name].includes(query)) {
      nfiSelectedFilters[data.name] = nfiSelectedFilters[data.name].replace(query, '');
    }
    this.setState({ nfiSelectedFilters });
  }

  handleClearFilters = () => {
    let nfiSelectedFilters = {}
    Object.keys(this.state.nfiSelectedFilters).forEach(filter =>{
      nfiSelectedFilters[filter] = ''
    })
    this.setState({ nfiSelectedFilters })
  }

  // FACETS
  makeFacets = () => {
    const promises = [];
    Object.keys(this.state.facets).map(key => {
      const entity = this.state.facets[key];
      promises.push(this.wrapPromiseGetEntity(entity));
    });
    Promise.all(promises)
      .then(() => {
        const facetEntities = Object.keys(this.state.facets).map(key => {
          return {
            entityName: this.state.facets[key].entityName,
            facetNames: this.state.facets[key].facetNames,
            data: this.props.nfi[key],
          };
        });

        const facetsData = this.composeFacets(facetEntities, this.props.nfiSearch.facets) 
        this.setState({ facetsData }, this.initiateSelectedFilters);
      })
      .catch(error => {
        console.log(error);
      });
  };

  composeFacets = (facetEntities, facets) => {
    let result = {};
    facetEntities.map(entity => {
      const facetNames = entity.facetNames;
      const entityName = entity.entityName;
      const entityData = entity.data;
      const reducer = (accumulator, currentValue) => {
        return Object.assign({}, facets[accumulator], facets[currentValue]);
      };
      const facetSets = facetNames.reduce(reducer, facetNames[0]);

      result[entityName] = this.formatSets(facetSets, entityData);
    });
    return result;
  };

  formatSets = (facetSets, facetEntitySets) => {
    let result = {};

    facetEntitySets.map(item => {
      const formatedItemName = item.name.toLowerCase();
      result[formatedItemName] = {};
      result[formatedItemName].id = item.id ? item.id : new Date().getTime();
      result[formatedItemName].name = item.name ? item.name : item;
      result[formatedItemName].number = facetSets[formatedItemName] || 0;
    });

    return result;
  };

  wrapPromiseGetEntity = entity => {
    return new Promise((resolve, reject) => {
      entity
        .getFunction()
        .then(response => {
          resolve({
            data: response.data,
            facetNames: entity.facetNames,
            entityName: entity.entityName,
          });
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  render() {
    const context = {
      term: this.props.searchableText,
      portalData: {
        id: 'portal',
        items: this.props.items,
        facets: this.state.facets,
        facetsData: this.state.facetsData,
        selectedFilters: this.state.nfiSelectedFilters,
        handleFilterSelected: this.handleFilterSelected,
        handleClearFilters: this.handleClearFilters
      },
      nfiData: {
        id: 'nfi',
        items: this.props.nfiSearch.results,
        facets: this.state.facets,
        facetsData: this.state.facetsData,
        selectedCountry: this.state.nfiSelectedCountry,
        selectedFilters: this.state.nfiSelectedFilters,
        handleCountrySelected: this.handleCountrySelected,
        handleFilterSelected: this.handleFilterSelected,
        handleClearFilters: this.handleClearFilters
      },
      pagination:
        this.state.activeTab === 1
          ? {
              ...this.state.pagination,
              updateItemsPerPage: this.updateItemsPerPage,
              updatePage: this.updatePage,
            }
          : null,
    };
    const loader = <h1>Loading data...</h1>;
    let multiselect, searchFilters;

    if (this.state.activeTab === 0) {
      multiselect = ''
      searchFilters = (<SearchFilters data={context.portalData} />);
    } else if (this.state.activeTab === 1) {
      multiselect = (
        <div className="multiselect-container">
          <Dropdown
            placeholder="Type..."
            fluid
            multiple
            selection
            search
            allowAdditions
            options={this.state.keywords}
            value={this.state.selectedKeywords}
            onChange={this.handleChange}
          />
          <Button
            className="search-button darkOrange"
            onClick={() => this.handleNfiSearch()}
          >
            Search
          </Button>
        </div>
      );
      searchFilters = (<SearchFilters data={context.nfiData} />);
    } else if (this.state.activeTab === 2) {
      multiselect = '';
      searchFilters = '';
    }

    const ui = (
      <Container>
        <Helmet title="Search" />
        <div className="search-page-content">
          <BodyClass />
            {multiselect}
            <Tab
              className="tabs-container"
              activeIndex={this.state.activeTab}
              menu={{
                compact: true,
                attached: false,
                tabular: false,
              }}
              panes={panes(context)}
              onTabChange={this.handleTabChange}
            />
            {searchFilters}
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
    if (!this.state.dataReady) return loader;
    return ui;
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
      originalKeywords: state.nfi.keyword.map(keyword => ({
        key: keyword.id,
        id: keyword.id,
        text: keyword.name,
        value: keyword.name,
      })),
      nfi: state.nfi,
      nfiSearch: state.nfi.search,
    }),
    {
      searchContent,
      setLoader,
      getKeywords,
      doNfiSearch,
      getCountry,
      getNutsLevel,
      getPublicationYears,
      getColectionRange,
      getTopicCategory,
      getResourceType,
      getDataSet,
      getDataType,
    },
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
        ),
    },
  ]),
)(Search);
