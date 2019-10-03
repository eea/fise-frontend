import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

class StackedBarChartView extends Component {
  constructor(props) {
    super(props);

    let chartData = this.props.data.chartData || [];

    try {
      if (typeof chartData !== 'string') {
        chartData = JSON.parse(chartData);
      }
    } catch (error) {
      console.log('Error in JSON parsing chart data', error);
      chartData = [];
    }

    // TODO: the axis labels need to come from the data

    this.state = {
      chartData,
    };
  }

  render() {
    return (
      <div className="chartWrapperView">
        <div className="tile-inner-wrapper">
          {this.state.chartData ? (
            <ResponsiveContainer>
              <BarChart
                data={this.state.chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Decidous" stackId="a" fill="#225511" />
                <Bar dataKey="Conifers" stackId="a" fill="#769e2e" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div>No valid data.</div>
          )}
        </div>
      </div>
    );
  }
}

StackedBarChartView.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default StackedBarChartView;
