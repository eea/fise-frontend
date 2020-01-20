import React, { Component } from 'react';
import DataConnectedValue from 'volto-datablocks/DataConnectedValue';

class View extends Component {
  render() {
    return (
      <div className="forest-block-wrapper">
        <div className="forest-specific-block forest-area-block">
          {this.props.data?.block_title ? (
            <h5>{this.props.data.block_title}</h5>
          ) : (
            ''
          )}

          <div className="land-data-wrapper eu28-data purple">
            <div className="land-data">
              <span>
                {this.props.data.provider_url &&
                  this.props.data.columns?.total && (
                    <DataConnectedValue
                      url={this.props.data.provider_url}
                      column={this.props.data.columns.total.value}
                      format={this.props.data.columns.total.format}
                    />
                  )}
              </span>
            </div>
            <div className="land-data-content">
              <span>{this.props.data?.columns?.totalUnit?.value}</span>
              {this.props.data?.columns?.totalText?.value}
            </div>
          </div>
          <div>
            <a
              className="discreet block_source"
              href={this.props.data.chart_source_link}
            >
              {this.props.data.chart_source}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default View;
