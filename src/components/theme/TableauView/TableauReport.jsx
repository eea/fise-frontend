import React from 'react';
import PropTypes from 'prop-types';
import url from 'url';
// import { Promise } from 'es6-promise';
import shallowequal from 'shallowequal';
import tokenizeUrl from './tokenizeUrl';

const propTypes = {
  filters: PropTypes.object,
  url: PropTypes.string.isRequired,
  parameters: PropTypes.object,
  options: PropTypes.object,
  token: PropTypes.string,
  onLoad: PropTypes.func,
  query: PropTypes.string,
};

const defaultProps = {
  loading: false,
  parameters: {},
  filters: {},
  options: {},
  query: '?:embed=yes&:comments=no&:toolbar=yes&:refresh=yes',
};

class TableauReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: props.filters,
      parameters: props.parameters,
      saveData: {
        url: props.url,
        filters: {},
      },
    };

    if (!__SERVER__) {
      // this.api = require('./../../../../thirdparty/tableau-2.3.0');
    } else {
      // this.api = null;
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.initTableau();
  }

  componentWillReceiveProps(nextProps) {
    const isReportChanged = nextProps.url !== this.props.url;
    const isFiltersChanged = !shallowequal(
      this.props.filters,
      nextProps.filters,
      this.compareArrays,
    );
    const isParametersChanged = !shallowequal(
      this.props.parameters,
      nextProps.parameters,
    );
    const isLoading = this.state.loading;

    // Only report is changed - re-initialize
    if (isReportChanged) {
      this.initTableau(nextProps.url);
    }

    // Only filters are changed, apply via the API
    if (!isReportChanged && isFiltersChanged && !isLoading) {
      this.applyFilters(nextProps.filters);
    }

    // Only parameters are changed, apply via the API
    if (!isReportChanged && isParametersChanged && !isLoading) {
      this.applyParameters(nextProps.parameters);
    }

    // token change, validate it.
    if (nextProps.token !== this.props.token) {
      this.setState({ didInvalidateToken: false });
    }
  }

  onChange() {
    this.props.callback && this.props.callback(this.state.saveData);
  }

  /**
   * Compares the values of filters to see if they are the same.
   * @param  {Array<Number>} a
   * @param  {Array<Number>} b
   * @return {Boolean}
   */
  compareArrays(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.sort().toString() === b.sort().toString();
    }

    return undefined;
  }

  /**
   * Execute a callback when an array of promises complete, regardless of
   * whether any throw an error.
   */
  onComplete(promises, cb) {
    Promise.all(promises).then(() => cb(), () => cb());
  }

  /**
   * Returns a vizUrl, tokenizing it if a token is passed and immediately
   * invalidating it to prevent it from being used more than once.
   */
  getUrl(nextUrl) {
    const newUrl = nextUrl || this.props.url;
    const { token, query } = this.props;
    const parsed = url.parse(newUrl, true);

    if (!this.state.didInvalidateToken && token) {
      this.invalidateToken();
      return tokenizeUrl(newUrl, token) + query;
    }

    return parsed.protocol + '//' + parsed.host + parsed.pathname + query;
  }

  // invalidateToken() {
  //   this.setState({ didInvalidateToken: true });
  // }

  /**
   * Asynchronously applies filters to the worksheet, excluding those that have
   * already been applied, which is determined by checking against state.
   * @param  {Object} filters
   * @return {void}
   */
  // applyFilters(filters) {
  //   const REPLACE = Tableau.FilterUpdateType.REPLACE;
  //   const promises = [];
  //
  //   this.setState({ loading: true });
  //
  //   for (const key in filters) {
  //     if (
  //       !this.state.filters.hasOwnProperty(key) ||
  //       !this.compareArrays(this.state.filters[key], filters[key])
  //     ) {
  //       promises.push(this.sheet.applyFilterAsync(key, filters[key], REPLACE));
  //     }
  //   }
  //
  //   this.onComplete(promises, () => this.setState({ loading: false, filters }));
  // }
  //
  // applyParameters(parameters) {
  //   const promises = [];
  //
  //   for (const key in parameters) {
  //     if (
  //       !this.state.parameters.hasOwnProperty(key) ||
  //       this.state.parameters[key] !== parameters[key]
  //     ) {
  //       const val = parameters[key];
  //       // Ensure that parameters are applied only when we have a workbook
  //       if (this.workbook && this.workbook.changeParameterValueAsync) {
  //         promises.push(this.workbook.changeParameterValueAsync(key, val));
  //       }
  //     }
  //   }
  //
  //   this.onComplete(promises, () =>
  //     this.setState({ loading: false, parameters }),
  //   );
  // }

  /**
   * Initialize the viz via the Tableau JS API.
   * @return {void}
   */
  initTableau(nextUrl) {
    if (__SERVER__) return;
    const { filters, parameters } = this.props;
    const vizUrl = this.getUrl(nextUrl);

    console.log('initing tableau', vizUrl);
    const options = {
      ...filters,
      ...parameters,
      ...this.props.options,
      // hideTabs: true,
      onFirstInteractive: () => {
        console.log('On first interacitve');
        this.workbook = this.viz.getWorkbook();
        let activeSheet = this.workbook.getActiveSheet();

        let saveData = JSON.parse(JSON.stringify(this.state.saveData));
        saveData['url'] = this.viz.getUrl();
        saveData['sheetname'] = activeSheet.getName();

        console.log('urls', this.props.url, this.state.saveData.url);

        if (this.props.url !== this.state.saveData.url) {
          this.setState({ saveData }, this.onChange);
        } else {
          this.setState({ saveData });
        }

        this.viz.addEventListener(
          this.api.tableauSoftware.TableauEventName.TAB_SWITCH,
          e => {
            let sheetname = e.getNewSheetName();

            this.viz.getCurrentUrlAsync().then(r => {
              const save = {
                ...this.state.saveData,
                sheetname: sheetname,
                url: r,
                filters: {
                  ...this.state.saveData.filters,
                },
              };
              this.setState({ saveData: save }, this.onChange);
            });
          },
        );
        this.viz.addEventListener(
          this.api.tableauSoftware.TableauEventName.FILTER_CHANGE,
          e => {
            console.log('changed filter');

            e.getFilterAsync().then(r => {
              console.log('filter async', r);
              let name = r.$caption;
              let values = r.$appliedValues.map(e => e.value);
              let sheetname = this.state.saveData.sheetname;
              const save = {
                ...this.state.saveData,
                filters: {
                  ...this.state.saveData.filters,
                  [sheetname]: {
                    ...(this.state.saveData.filters[sheetname] || {}),
                    [name]: values,
                  },
                },
              };
              this.setState({ saveData: save }, this.onChange);
            });
          },
        );
      },
    };

    console.log('the options', options);
    // cleanup
    if (this.viz) {
      this.viz.dispose();
      this.viz = null;
    }

    this.viz = new this.api.tableauSoftware.Viz(
      this.container,
      vizUrl,
      options,
    );
  }

  render() {
    if (__SERVER__) return '';
    return <div ref={c => (this.container = c)} />;
  }
}

TableauReport.propTypes = propTypes;
TableauReport.defaultProps = defaultProps;

export default TableauReport;
