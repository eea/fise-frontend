import React, { Component } from 'react';
// import TableauReport from '~/components/theme/TableauView/TableauReport';

class View extends Component {
  render() {
    return (
      <div className="block-container">
        <div className="forest-block-wrapper">
          <div className="forest-specific-block forest-area-block">
            <h5>{this.props.data.europe_block_title}</h5>

            <div className="land-data-wrapper eu28-data">
              <div className="land-data">
                <span>{this.props.data.europe_forest_p_eu28}</span>
              </div>
              <div className="land-data-content">
                {this.props.data.europe_forest_p_eu28_text}{' '}
                <span>{this.props.data.europe_forest_l_eu28}</span>
              </div>
            </div>

            <div className="land-data-wrapper eea39-data">
              <div className="land-data">
                <span>{this.props.data.europe_forest_p_eea39}</span>
              </div>
              <div className="land-data-content">
                {this.props.data.europe_forest_p_eea39_text}{' '}
                <span>{this.props.data.europe_forest_l_eea39}</span>
              </div>
            </div>

            <a className="discreet" href={this.props.data.europe_block_link}>
              {this.props.data.europe_text_attribution}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default View;
