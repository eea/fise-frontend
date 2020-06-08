import React, { useEffect } from 'react';
import DataConnectedValue from 'volto-datablocks/DataConnectedValue';
import { SourceView } from 'volto-datablocks/Sources';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { getBasePath } from 'volto-datablocks/helpers';
import {
  setConnectedDataParameters,
} from 'volto-datablocks/actions';

const objectHasData = (obj) => {
  return typeof obj === 'object' && obj !== null && Object.keys(obj).length > 0
}

const View  = props => {
    useEffect(() => {
      if (
        !objectHasData(props.connected_data_parameters).byProviderPath &&
        !objectHasData(props.connected_data_parameters).byContextPath &&
        !objectHasData(props.connected_data_parameters).byPath &&
        props?.data?.columns?.i?.value &&
        props?.data?.columns?.v?.value
      ) {
        const path = getBasePath(props.pathname)
        props.dispatch(setConnectedDataParameters(path, [{ i: props.data.columns.i.value, v: props.data.columns.v.value.split(',')}]))
      }
    }, [props?.data?.columns?.i, props?.data?.columns?.v])
    return (
    <div className="forest-block-wrapper">
      <div className="forest-specific-block forest-area-block">
        {props.data?.block_title ? (
          <h5>{props.data.block_title}</h5>
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

export default compose(
  connect(
    (state, props) => ({
      connected_data_parameters: state.connected_data_parameters,
      pathname: state.router.location.pathname
    }),
  ),
)(View);
