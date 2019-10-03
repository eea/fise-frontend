import React, { Component } from 'react';

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

const data = [
  { name: '00', Decidous: 4000, Conifers: 2400 },
  { name: '04', Decidous: 3000, Conifers: 1398 },
  { name: '08', Decidous: 2000, Conifers: 9800 },
  { name: '12', Decidous: 2780, Conifers: 3908 },
  { name: '16', Decidous: 1890, Conifers: 4800 },
];

class StackedBarChart extends Component {
  constructor(props) {
    super(props);

    const chartData = this.props.data.chartData || data;
    let show = this.props.data.chartData ? true : false;

    this.state = {
      show,
      chartData: chartData,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getChartData = this.getChartData.bind(this);
  }

  handleChange(e) {
    let data = e.target.value;
    try {
      data = JSON.parse(e.target.value);
      this.setState(
        {
          chartData: data,
          show: true,
        },
        this.onSubmit,
      );
    } catch {
      console.warning('Invalid JSON data: ', data);
    }
  }

  onSubmit() {
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      chartData: this.state.chartData,
    });
  }

  getChartData() {
    let chartData = this.state.chartData;
    if (typeof chartData == 'string') {
      try {
        chartData = JSON.parse(chartData);
      } catch (error) {
        console.log(error);
        chartData = [];
      }
    }
    // TODO: the axis labels need to come from the data
    // console.log(chartData);
    return chartData;
  }

  render() {
    console.log(this.state);
    return (
      <div className="tile hero selected chartWrapperEdit">
        <div className="tile-inner-wrapper">
          {this.state.show && this.state.chartData ? (
            <div className="image-add">
              <ResponsiveContainer>
                <BarChart
                  data={this.getChartData()}
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
            </div>
          ) : (
            <div className="image-add">
              <div class="ui segment">
                <div class="ui placeholder">
                  <div class="image header">
                    <div class="line" />
                    <div class="line" />
                  </div>
                  <div class="paragraph">
                    <div class="medium line" />
                    <div class="short line" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="hero-body">
            <label htmlFor="chart-data">Enter JSON data</label>
            <textarea
              id="chart-data"
              defaultValue={JSON.stringify(this.getChartData())}
              placeholder="Enter data in JSON format"
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default StackedBarChart;
