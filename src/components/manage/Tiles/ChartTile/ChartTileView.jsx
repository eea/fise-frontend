import Loadable from 'react-loadable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import { ResponsiveContainer } from 'recharts';

const LoadablePlot = Loadable({
  loader: () => import('react-plotly.js'),
  loading() {
    return <div>Loading chart...</div>;
  },
});

class StackedBarChartView extends Component {
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
        <div className="tile-inner-wrapper">
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <div class="tile-text-content">
                  {text && <div dangerouslySetInnerHTML={{ __html: text }} />}
                </div>
              </Grid.Column>
              <Grid.Column>
                {this.state.chartData ? (
                  <ResponsiveContainer>
                    <LoadablePlot
                      data={this.state.chartData.data || []}
                      layout={this.state.chartData.layout || {}}
                      frames={this.state.chartData.frames || []}
                      config={{ displayModeBar: false }}
                    />
                  </ResponsiveContainer>
                ) : (
                  <div>No valid data.</div>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

StackedBarChartView.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default StackedBarChartView;
