import React, { Component } from 'react';
import DataConnectedValue from 'volto-datablocks/DataConnectedValue';

class View extends Component {
  render() {
    return (
      <div className="block-container">
        <div className="forest-block-wrapper">
          <div className="forest-specific-block forest-area-block">
            <h5>Forest deadwood volume</h5>
            <div className="land-data-wrapper eu28-data purple">
              <div className="land-data">
                <span>
                  {this.props.data.url && this.props.data.columns?.total && (
                    <DataConnectedValue
                      url={this.props.data.url}
                      column={this.props.data.columns.total.value}
                      format={this.props.data.columns.total.format}
                    />
                  )}
                </span>
              </div>
              <div className="land-data-content">
                <span>m3/ha</span>
                standing deadwood volume
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default View;
