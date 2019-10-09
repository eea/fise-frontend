import React, { Component } from 'react';
import 'react-chart-editor/lib/react-chart-editor.css';
import Loadable from 'react-loadable';
// import plotly from 'plotly.js/dist/plotly';

const LoadablePlotlyEditor = Loadable({
  loader: () => import('react-chart-editor'),
  loading() {
    return <div>Loading...</div>;
  },
});

const dataSources = {
  col1: [1, 2, 3], // eslint-disable-line no-magic-numbers
  col2: [4, 3, 2], // eslint-disable-line no-magic-numbers
  col3: [17, 13, 9], // eslint-disable-line no-magic-numbers
};

const dataSourceOptions = Object.keys(dataSources).map(name => ({
  value: name,
  label: name,
}));

const config = { editable: true };

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [], layout: {}, frames: [] };

    // this.onSubmit = this.onSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.getChartData = this.getChartData.bind(this);
  }

  render() {
    console.log(this.state);
    const plotly = require('plotly.js/dist/plotly');
    return (
      <div>
        {__SERVER__ ? (
          ''
        ) : (
          <div className="tile selected">
            <div className="tile-inner-wrapper">
              <LoadablePlotlyEditor
                data={this.state.data}
                layout={this.state.layout}
                config={config}
                frames={this.state.frames}
                dataSources={dataSources}
                dataSourceOptions={dataSourceOptions}
                plotly={plotly}
                onUpdate={(data, layout, frames) =>
                  this.setState({ data, layout, frames })
                }
                useResizeHandler
                debug
                advancedTraceTypeSelector
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Edit;
//
// handleChange(e) {
//   let data = e.target.value;
//   try {
//     data = JSON.parse(e.target.value);
//     this.setState(
//       {
//         chartData: data,
//         show: true,
//       },
//       this.onSubmit,
//     );
//   } catch {
//     console.warning('Invalid JSON data: ', data);
//   }
// }
//
// onSubmit() {
//   this.props.onChangeTile(this.props.tile, {
//     ...this.props.data,
//     chartData: this.state.chartData,
//   });
// }
//
// getChartData() {
//   let chartData = this.state.chartData;
//   if (typeof chartData == 'string') {
//     try {
//       chartData = JSON.parse(chartData);
//     } catch (error) {
//       console.log(error);
//       chartData = [];
//     }
//   }
//   // TODO: the axis labels need to come from the data
//   // console.log(chartData);
//   return chartData;
// }
