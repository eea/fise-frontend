import React, { Component } from 'react';
import DataConnectedValue from 'volto-datablocks/DataConnectedValue';

class View extends Component {
  render() {
    console.log('props', this.props);
    return (
      <div className="block-container">
        <div className="forest-block-wrapper">
          <div className="forest-specific-block forest-area-block">
            <h5>Forest coverage</h5>
            <div className="land-data-wrapper eu28-data">
              <div className="land-data">
                <span>
                  {this.props.data.url && this.props.data.columns?.column1 && (
                    <DataConnectedValue
                      url={this.props.data.url}
                      column={this.props.data.columns.column1.value}
                      format={this.props.data.columns.column1.format}
                    />
                  )}
                </span>
              </div>
              <div className="land-data-content">
                of land surface
                <span>
                  {this.props.data.url && this.props.data.columns?.column2 && (
                    <DataConnectedValue
                      url={this.props.data.url}
                      column={this.props.data.columns.column2.value}
                      format={this.props.data.columns.column2.format}
                    />
                  )}{' '}
                  Mha
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default View;
