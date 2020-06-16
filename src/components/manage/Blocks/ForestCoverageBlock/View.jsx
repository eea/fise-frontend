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
              {props?.data?.columns?.perc && (
                <DataConnectedValue
                  filterIndex={state.ids?.[0] || 0}
                  url={
                    props?.data?.providers?.['data_provider']?.path ||
                    props?.data?.provider_url
                  }
                  column={props.data.columns.perc.value}
                  format={props.data.columns.perc.format}
                  placeholder="_"
                />
              )}
            </span>
          </div>
          <div className="land-data-content">
            <span>
              {props?.data?.columns?.perc && (
                <DataConnectedValue
                  filterIndex={state.ids?.[1] || 0}
                  url={
                    props?.data?.providers?.['data_provider_ii']?.path ||
                    props?.data?.provider_url
                  }
                  column={
                    props.data?.columns?.perc_ii?.value ||
                    props.data?.columns?.totalArea?.value
                  }
                  format={
                    props.data?.columns?.perc_ii?.format ||
                    props.data?.columns?.totalArea?.format
                  }
                  placeholder="_"
                />
              )}
              {' ' + props.data?.columns?.totalAreaUnit?.value}
            </span>
            {' ' + props.data?.columns?.percText?.value}
          </div>
        </div>

        <div>
          {props?.data?.chart_source && props?.data?.chart_source_link && (
            <SourceView
              initialSource={props.data.chart_source}
              initialSourceLink={props.data.chart_source_link}
              multipleSources={props.data.chartSources}
              providerUrl={
                props.data.providers?.['data_provider']?.path ||
                props.data.provider_url
              }
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
