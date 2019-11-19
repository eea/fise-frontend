import React, { Component } from 'react';
import TableauReport from '~/components/theme/TableauView/TableauReport';

class TableauBlockView extends Component {
  constructor(props) {
    super(props);

    let data = this.props.data.tableauData || {};
    let filters =
      data.filters && data.sheetname ? data.filters[data.sheetname] : {};
    this.state = {
      show: __SERVER__ ? false : true,
      url: data.url || '',
      sheetname: data.sheetname || '',
      filters: filters,
    };
  }

  render() {
    if (__SERVER__) return '';
    return (
      <div className="chartWrapperView">
        {this.state.show && this.state.url ? (
          <TableauReport
            url={this.state.url}
            filters={this.state.filters}
            sheetname={this.state.sheetname}
          />
        ) : (
          <div>Invalid or missing data.</div>
        )}
      </div>
    );
  }
}

export default TableauBlockView;
