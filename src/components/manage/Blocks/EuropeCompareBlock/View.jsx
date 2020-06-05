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

        <div className="land-data-wrapper">
          <div className="land-data">
            <span>
              {props.data.provider_url &&
                props.data.columns?.total && (
                  <DataConnectedValue
                    url={props.data.provider_url}
                    column={props.data.columns.total.value}
                    format={props.data.columns.total.format}
                    placeholder="_"
                  />
                )
              }
            </span>
          </div>
          <div className="land-data-content">
            <span>{props.data?.columns?.totalUnit?.value}</span>
            {props.data?.columns?.totalText?.value}
          </div>
        </div>

        <div className="ui bulleted list">
          <div className="item">
            {props.data?.columns?.data1Text?.value}
            <span>{props.data?.columns?.data1Quantity?.value}</span>
          </div>
          <div className="item">
            {props.data?.columns?.data2Text?.value}
            <span>{props.data?.columns?.data2Quantity?.value}</span>
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