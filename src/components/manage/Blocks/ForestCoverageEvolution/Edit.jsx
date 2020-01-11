import { getChartDataFromVisualization } from 'volto-plotlycharts/actions';
import { searchContent } from '@plone/volto/actions';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import React, { Component } from 'react';
import { Grid, Form as UiForm } from 'semantic-ui-react';
import { Field } from '@plone/volto/components'; // EditBlock

import DataConnectedValue from 'volto-datablocks/DataConnectedValue';
import EditBlock from 'volto-datablocks/DataConnectedBlock/EditBlock';

const LoadablePlot = Loadable({
  loader: () => import('volto-plotlycharts/ChartBlock/View'),
  loading() {
    return <div>Loading chart...</div>;
  },
});
/*
 * Pick up a chart from an existing visualization, add text
 */
class ChartPick extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   // const localChartData = props.data.chartData || {};
  //
  //   // let text = props.data['chart-text'];
  //   // if (typeof text !== 'string') text = '';
  //
  //   // this.state = {
  //   //   localChartData,
  //   //   ...props.data,
  //   //   url: props.data.url || null,
  //   //   columns: {
  //   //     column1: props.data.columns?.column1 || null,
  //   //   },
  //   // };
  //
  //   // this.onSubmit = this.onSubmit.bind(this);
  //   // this.updateData = this.updateData.bind(this);
  //   // this.getChartData = this.getChartData.bind(this);
  //   // this.handleChangeVisualization = this.handleChangeVisualization.bind(this);
  // }

  // updateData(obj) {
  //   this.setState(obj, this.onSubmit);
  // }

  // onSubmit(data) {
  //   this.props.onChangeBlock(this.props.block, {
  //     ...this.props.data,
  //     data,
  //   });
  // }

  // handleChangeVisualization(id, path) {
  //   // TODO: use getContent with subrequest, no need for specially dedicated
  //   // action and reducer. Complication not needed.
  //   this.props.getChartDataFromVisualization(path);
  //   this.onSubmit(path);
  // }
  //
  // componentDidMount() {
  //   // get the existing visualizations
  //   this.props.searchContent('', {
  //     // object_provides: 'forests.content.interfaces.IDataVisualization',
  //     portal_type: 'visualization',
  //   });
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.remoteChartData !== prevProps.remoteChartData) {
  //     console.log('we are here');
  //     this.setState({
  //       localChartData: this.props.remoteChartData,
  //     });
  //   }
  // }

  render() {
    console.log('vizualization', this.props);
    return (
      <div className="block selected">
        <div className="block-inner-wrapper">
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                {/* <EditBlock
                  updateData={this.updateData}
                  block="data-entity"
                  data={this.props.remoteChartData.data}
                  title="Data block parameters"
                /> */}
                {this.props.remoteChartData && (
                  <LoadablePlot
                    data={this.props.remoteChartData || []}
                    layout={this.props.remoteChartData.layout || {}}
                    frames={this.props.remoteChartData.frames || []}
                    config={{ displayModeBar: false }}
                  />
                )}
              </Grid.Column>
              <Grid.Column>l</Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default ChartPick;

// export default connect(
//   (state, props) => {
//     // const chartData = state.data_providers ? state.data_providers.item : {};
//     // console.log('connect props', state, props);
//     let visualizations = state.search ? state.search.items : [];
//     visualizations = visualizations.map(el => [el['@id'], el.title]);
//     return {
//       visualizations,
//       remoteChartData:
//         state.chart_data_visualization && state.chart_data_visualization.data,
//     };
//   },
//   { searchContent, getChartDataFromVisualization },
// )(ChartPick);
