import Loadable from 'react-loadable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const LoadablePlot = Loadable({
  loader: () => import('react-plotly.js'),
  loading() {
    return <div>Loading chart...</div>;
  },
});

class ChartView extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.data.chartData };
  }

  render() {
    return (
      <div className="chartWrapperView">
        <div className="block-inner-wrapper">
          <LoadablePlot
            data={this.state.data}
            layout={this.state.layout}
            frames={this.state.frames}
            config={{ displayModeBar: false }}
          />
        </div>
      </div>
    );
  }
}

ChartView.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ChartView;
