import React, { Component } from 'react';
// import TableauReport from '~/components/theme/TableauView/TableauReport';

class View extends Component {
  render() {
    console.log('props', this.props);
    return (
      <div>
        <div className="data-box orange-data-highlight">
          <h5>{this.props.data.europe_tile_title}</h5>
          <div className="land-data-wrapper">
            <div className="land-data">{this.props.data.europe_protected_area}</div>
            <div className="land-data-content">
              of Europe's land surface <span>{this.props.data.europe_total_area}</span>
          </div>
        </div>
        <div className="ui bulleted list">
          <div className="item">
            {this.props.data.europe_country_1_name}
            <span>{this.props.data.europe_country_1_value}</span>
          </div>
          <div className="item">
            {this.props.data.europe_country_2_name}
            <span>{this.props.data.europe_country_2_value}</span>
          </div>
          <div className="item">
            {this.props.data.europe_country_3_name}
            <span>{this.props.data.europe_country_3_value}</span>
          </div>
        </div>
        <a href={this.props.data.europe_tile_link}>
          <span className="discreet">See all countries</span>
        </a>
      </div>
      </div>
    );
  }
}

export default View;
