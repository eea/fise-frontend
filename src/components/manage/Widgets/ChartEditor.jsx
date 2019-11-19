import React, { Component } from 'react';
import 'react-chart-editor/lib/react-chart-editor.css';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { searchContent } from '@plone/volto/actions';
import { getDataFromProvider } from '~/actions';
import { Dropdown } from 'semantic-ui-react';

const LoadablePlotlyEditor = Loadable({
  loader: () => import('react-chart-editor'),
  loading() {
    return <div>Loading chart editor...</div>;
  },
});

const dataSources = {
  col1: [1, 2, 3], // eslint-disable-line no-magic-numbers
  col2: [4, 3, 2], // eslint-disable-line no-magic-numbers
  col3: [17, 13, 9], // eslint-disable-line no-magic-numbers
};

function getDataSourceOptions(data) {
  return Object.keys(data).map(name => ({
    value: name,
    label: name,
  }));
}

const config = { editable: true };

class Edit extends Component {
  constructor(props) {
    super(props);

    console.log('chart editor props', props);
    const chartData = props.value || {};

    this.state = {
      data: chartData.data || [],
      layout: chartData.layout || {},
      frames: chartData.frames || [],
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeProvider = this.handleChangeProvider.bind(this);
  }

  onSubmit() {
    const chartData = {
      data: this.state.data,
      layout: this.state.layout,
      frames: this.state.frames,
    };
    this.props.onChangeValue(chartData);
  }

  componentWillMount() {
    this.props.searchContent('', {
      object_provides: 'forests.content.interfaces.IBasicDataProvider',
    });
  }

  handleChange(data, layout, frames) {
    this.setState({ data, layout, frames }, this.onSubmit);
  }

  handleChangeProvider(ev, { value }) {
    this.props.getDataFromProvider(value);
  }

  render() {
    const plotly = require('plotly.js/dist/plotly');
    const selectProviders = this.props.providers.map(el => {
      return {
        key: el['@id'],
        text: el.title,
        value: el['@id'],
      };
    });

    return (
      <div>
        {__CLIENT__ ? (
          <div className="block selected">
            <div className="block-inner-wrapper">
              <Dropdown
                placeholder="Select data provider"
                fluid
                selection
                options={selectProviders}
                onChange={this.handleChangeProvider}
              />
              <LoadablePlotlyEditor
                data={this.state.data}
                layout={this.state.layout}
                config={config}
                frames={this.state.frames}
                dataSources={this.props.providerData || dataSources}
                dataSourceOptions={
                  this.props.dataSourceOptions ||
                  getDataSourceOptions(dataSources)
                }
                plotly={plotly}
                onUpdate={this.handleChange}
                useResizeHandler
                debug
                advancedTraceTypeSelector
              />
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    const providerData = state.data_providers ? state.data_providers.item : {};
    return {
      providers: state.search.items,
      providerData,
      dataSourceOptions: getDataSourceOptions(providerData || dataSources),
    };
  },
  { searchContent, getDataFromProvider },
)(Edit);
