import Loadable from 'react-loadable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

const LoadablePlot = Loadable({
  loader: () => import('react-plotly.js'),
  loading() {
    return <div>Loading chart...</div>;
  },
});

class EmbedChartView extends Component {
  constructor(props) {
    super(props);

    console.log('chart data', this.props.data, this.props);
    let chartData = this.props.data.chartData || [];

    if (typeof chartData === 'string') {
      try {
        chartData = JSON.parse(chartData);
      } catch (error) {
        console.log('Error in JSON parsing chart data', error);
        chartData = {};
      }
    }

    // TODO: the axis labels need to come from the data

    this.state = {
      chartData,
    };
  }

  render() {
    let text = this.props.data['chart-text'];
    if (typeof text !== 'string') text = '';
    return (
      <div className="chartWrapperView">
        <div className="block-inner-wrapper">
          <Grid>
            <Grid.Column width={4}>
              <div className="block-text-content">
                {text && <div dangerouslySetInnerHTML={{ __html: text }} />}
              </div>
            </Grid.Column>
            <Grid.Column width={8}>
              {this.state.chartData ? (
                <LoadablePlot
                  className="embedded-chart"
                  data={this.state.chartData.data || []}
                  layout={{
                    ...this.state.chartData.layout,
                    autosize: true,
                  }}
                  frames={this.state.chartData.frames || []}
                  config={{ displayModeBar: false }}
                  />
              ) : (
                <div>No valid data.</div>
              )}
            </Grid.Column>
            <Grid.Column width={12}>
              <div>
                <a className="discreet"
                   href={this.props.data.chart_source_link}>
                  {this.props.data.chart_source}
                </a>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

EmbedChartView.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EmbedChartView;
