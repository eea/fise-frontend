import React, { Component } from 'react';
import DataConnectedValue from 'volto-datablocks/DataConnectedValue';
import { SourceView } from 'volto-datablocks/Sources';

const View  = props => {
    return (
    <div className="forest-block-wrapper">
      <div className="forest-specific-block forest-area-block">
        {props.data?.europe_block_title ? (
          <h5>{props.data.europe_block_title}</h5>
        ) : (
          ''
        )}

        <div className="land-data-wrapper eu28-data">
          <div className="land-data">
            <span>
              {props.data.provider_url &&
                props.data.columns?.eu28_total && (
                  <DataConnectedValue
                    url={props.data.provider_url}
                    column={props.data.columns.eu28_total.value}
                    format={props.data.columns.eu28_total.format}
                    placeholder="_"
                  />
                )
              }
            </span>
          </div>
          <div className="land-data-content">
            <span>{props.data?.columns?.eu28_total_unit?.value}</span>
            {props.data?.columns?.eu28_total_text?.value}
          </div>
        </div>

        <div className="land-data-wrapper eea39-data">
          <div className="land-data">
            <span>
              {props.data.provider_url &&
                props.data.columns?.eea39_total && (
                  <div>
                    <DataConnectedValue
                      url={props.data.provider_url}
                      column={props.data.columns.eea39_total.value}
                      format={props.data.columns.eea39_total.format}
                      placeholder="_"
                    />
                  </div>
                )
              }
            </span>
          </div>
          <div className="land-data-content">
            <span>{props.data?.columns?.eea39_total_unit?.value}</span>
            {props.data?.columns?.eea39_total_text?.value}
          </div>
        </div>

        <div>
          <SourceView
            initialSource={props.data.chart_source}
            initialSourceLink={props.data.chart_source_link}
            multipleSources={props.data.chartSources}
            providerUrl={props.data.provider_url}
          />
        </div>
      </div>
    </div>
  );
}

export default View;
