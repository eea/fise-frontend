import React, { Component } from 'react';
// import TableauReport from '~/components/theme/TableauView/TableauReport';

class View extends Component {
  render() {
    console.log('props', this.props);
    return (
      <div className="forest-block-wrapper">
        <div className="forest-specific-block forest-comparation">
          <h5>{this.props.data.europe_block_title}</h5>
          <div className="land-data-wrapper">
            <div className="land-data">
              <span>{this.props.data.europe_forest_area}</span>
            </div>
            <div className="land-data-content">
              of Europe's land area consists of Forest and Other wooden land
            </div>
          </div>
          <div className="ui bulleted list">
            <div className="item">
              {this.props.data.europe_data_1_name}
              <span>{this.props.data.europe_data_1_value}</span>
            </div>
            <div className="item">
              {this.props.data.europe_data_2_name}
              <span>{this.props.data.europe_data_2_value}</span>
            </div>
          </div>
          <a className="discreet" href={this.props.data.europe_block_link}>
            {this.props.data.europe_text_attribution}
          </a>
        </div>
      </div>
    );
  }
}

export default View;
