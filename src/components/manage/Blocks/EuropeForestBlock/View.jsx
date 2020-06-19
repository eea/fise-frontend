import React, { useState } from 'react';
import DataConnectedValue from 'volto-datablocks/DataConnectedValue';
import { SourceView } from 'volto-datablocks/Sources';

import DefaultView from '../DefaultView';

const schema = require('./schema.json');
const View = props => {
  const [state, setState] = useState({
    onChange: newState => {
      setState({ ...state, ...newState });
    },
  });
  const view = (
    <div className="forest-block-wrapper">
      <div className="forest-specific-block forest-area-block">
        {props.data?.block_title ? <h5>{props.data.block_title}</h5> : ''}

        <div className="land-data-wrapper eu28-data">
          <div className="land-data">
            <span>
              <DataConnectedValue
                filterIndex={state.ids?.[0] || 0}
                url={
                  props.data?.providers?.['eu28_data_provider']?.path ||
                  props.data?.provider_url
                }
                column={props.data?.columns?.eu28_total?.value}
                format={props.data?.columns?.eu28_total?.format}
                placeholder="_"
              />
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
              <div>
                <DataConnectedValue
                  filterIndex={state.ids?.[1] || 0}
                  url={
                    props.data?.providers?.['eea39_data_provider']?.path ||
                    props.data?.provider_url
                  }
                  column={props.data?.columns?.eea39_total?.value}
                  format={props.data?.columns?.eea39_total?.format}
                  placeholder="_"
                />
              </div>
            </span>
          </div>
          <div className="land-data-content">
            <span>{props.data?.columns?.eea39_total_unit?.value}</span>
            {props.data?.columns?.eea39_total_text?.value}
          </div>
        </div>

        <div>
          {props?.data?.chart_source &&
            props?.data?.chart_source_link &&
            props?.data?.chartSources &&
            props?.data?.providers?.['eu28_data_provider'] && (
              <SourceView
                initialSource={props.data.chart_source}
                initialSourceLink={props.data.chart_source_link}
                multipleSources={props.data.chartSources}
                providerUrl={props.data.providers['eu28_data_provider']}
              />
            )}
        </div>
      </div>
    </div>
  );
  return (
    <DefaultView
      {...props}
      schema={schema}
      view={view}
      onChange={state.onChange}
    />
  );
};

export default View;
