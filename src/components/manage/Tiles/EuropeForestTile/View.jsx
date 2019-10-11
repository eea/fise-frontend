import React, { Component } from 'react';
// import TableauReport from '~/components/theme/TableauView/TableauReport';

class View extends Component {
  render() {
    console.log('props', this.props);
    return (
      <div className="forest-tile-wrapper">
        <div className="forest-specific-tile coverage-segment">
          <h5>{this.props.data.europe_tile_title}</h5>
          <div className="land-data-wrapper">
            <div className="land-data">
              {this.props.data.europe_forest_surface}
            </div>
            <div className="land-data-content">
              of Europe's land surface <span>{this.props.data.europe_total_area}</span>
            </div>
          </div>
          <div className="coverage-data">
            <div className="owned-data">
              <span>{this.props.data.europe_total_public}</span> publicy owned
            </div>
            <div className="private-data">
              <span>{this.props.data.europe_total_private}</span> private
            </div>
          </div>
            <a className="discreet" href={this.props.data.europe_tile_link}>
              {this.props.data.europe_text_attribution}
            </a>
        </div>
      </div>
    );
  }
}

export default View;
