import React, { Component } from 'react';
// import TableauReport from '~/components/theme/TableauView/TableauReport';

class View extends Component {
  render() {
    console.log('props', this.props);
    return (
      <div className="chartWrapperView">
        {this.props.data.europe_tile_title}
      </div>
    );
  }
}

export default View;
