/**
 * View image block.
 * @module components/manage/Blocks/Hero/View
 */

import React, { Component } from 'react';
import TableauReport from './TableauReport';

const visUrl = 'http://public.tableau.com/views/RegionalSampleWorkbook/Storms';
// const visUrl =
//   'https://public.tableau.com/views/RegionalSampleWorkbook/Obesity?%3Aembed=yes&%3Aembed=y&%3Acomments=no&%3Atoolbar=yes&%3Arefresh=yes&%3Asize=1573%2C1&%3AshowVizHome=n&%3Ajsdebug=y&%3AapiID=host0#navType=2&navSrc=Parse';

// const visUrl =
//   'https://tableau.discomap.eea.europa.eu/t/Aironline/views/AQStatisticsAggregations_0/StatisticsViewer';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
class TableauTestView extends Component {
  constructor(props) {
    super(props);

    // const chartData = this.props.data.chartData || [];
    this.state = {
      // renderChart: __SERVER__ ? false : true,
      renderChart: true,
      url: visUrl,
    };
    this.saveCallback.bind(this);
  }

  saveCallback(data) {
    console.log('Received data', data);
  }

  render() {
    if (__SERVER__) return '';

    return (
      <div className="chartWrapperView">
        <div className="block-inner-wrapper">
          {this.state.renderChart ? (
            <TableauReport url={this.state.url} callback={this.saveCallback} />
          ) : (
            <div>Invalid or missing data.</div>
          )}
        </div>
      </div>
    );
  }
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
// TableauTestView.propTypes = {
//   data: PropTypes.objectOf(PropTypes.any).isRequired,
// };
//
export default TableauTestView;
